pragma solidity ^0.4.22;

// Receives and shares
contract Shares {
    
    event StockPurchase(address indexed buyer, address indexed seller, uint indexed stock);
    event ShareTransfer(address indexed shareholdera, address indexed shareholderb, uint indexed share);
    event AllocateBalance(uint indexed cbalance);
    
    uint constant public shares = 100;
    uint public balance = address(this).balance;
    uint public agreement = 0;
    address[] public shareholders;
    
    struct shareholder {
        uint share;
        bool vote;
    }
    
    mapping (address => shareholder) public shareholderInfo;
    
    function() public payable {}
    
    constructor() public {
        shareholders.push(msg.sender);
        shareholderInfo[shareholders[0]].share = 100;
    }
    
    // --- Ecommerce part --- //
    
    // Function will send % of value to seller and will keep % to contract
    function purchase(address _seller, uint _stock) public payable {
        require (msg.sender.balance > msg.value);
        _seller.transfer((msg.value / 100) * 85);
        balance += (msg.value / 100) * 15;
        
        emit StockPurchase(msg.sender, _seller, _stock);
    }
    
    // --- Shareholders part --- //
    
    // Check for shareholder existаnce
    function checkShareExist(address addr) public constant returns(bool) {
        if (addr == address(0)) {
            addr = msg.sender;   
        }
        for(uint256 i = 0; i < shareholders.length; i++) {
            if(shareholders[i] == addr) return true;
        }
        return false;
    }
    
    // Shareholder can transfer own share to another address
    function transferShare(address addr, uint amount) public returns(bool) {
        // Requires to msg.sender is shareholder
        require( checkShareExist(msg.sender) );
        require( shareholderInfo[msg.sender].share >= amount );

        if (checkShareExist(addr)) {
            shareholderInfo[msg.sender].share -= amount;
            shareholderInfo[addr].share += amount;
        } else {
            shareholderInfo[msg.sender].share -= amount;
            shareholders.push(addr);
            shareholderInfo[addr].share += amount;
        }
        
        emit ShareTransfer(msg.sender, addr, amount);
        
        return true;
    }
    
    // Function will allocation funds between shareholders in proportion to the shareholders percentage
    // Allocation will be possible if agreement > 50
    function fundsAllocation() public payable {
        require( agreement > 50 );
        for(uint256 i = 0; i < shareholders.length; i++) {
            if (shareholderInfo[shareholders[i]].share >=1) {
                shareholders[i].transfer((balance / 100) * shareholderInfo[shareholders[i]].share);
                shareholderInfo[shareholders[i]].vote = false;
            }
        }
        
        emit AllocateBalance(balance);
        
        agreement = 0;
        balance = 0;
    }
    
    // Every shareholder will vote to collect votes
    function allocationVote() public {
        require( checkShareExist(msg.sender) );
        require( shareholderInfo[msg.sender].vote != true );
        shareholderInfo[msg.sender].vote = true;
        agreement += shareholderInfo[msg.sender].share;
    }
}





