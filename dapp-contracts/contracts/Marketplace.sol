// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./NFTCollection.sol";
//import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {
    using SafeMath for uint256;

    // Declare market variables
    address payable private immutable _owner;
    string  private _name;

    // store market fee in wei to keep float values
    uint256 private _fee;

    // number of collections
    uint256 private _collectionCounter;

    mapping (address => uint256) private _userFunds;

    constructor(string memory _marketName, uint256 _marketFee) {
        _name  = _marketName;
        _fee   = _marketFee;
        _owner = payable(msg.sender);
    }

    // market getters
    function getName()  public view returns (string memory) {
        return _name;
    }

    function getFee()   public view returns (uint) {
        return _fee;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }

    function getUserFunds(address _address) public view returns (uint) {
        return _userFunds[_address];
    }

    // market setters
    function setName(string memory _marketName) public {
        require(msg.sender == _owner, "only owner can change market name");
        require(bytes(_marketName).length != 0, "name should be not empty");
        _name = _marketName;
    }

    function setFee(uint256 _marketFee) public {
        require(msg.sender == _owner, "only owner can change market fee");
        require(_marketFee > 0, "market fee should be greater than zero");
        _fee = _marketFee;
    }

    // Collections
    mapping(uint256 => Collection) private _collections;
    // search maps
    mapping(string => uint256)     private _collectionsNames;
    mapping(string => uint256)     private _collectionsSymbols;
    // exist maps
    mapping(string => bool)        private _collectionNameExists;
    mapping(string => bool)        private _collectionSymbolExists;
    mapping(address => bool)       private _collectionAddressExists;

    struct Collection {
        string  name;
        string  symbol;
        string  description;
        NFTCollection nftCollection;
        uint256 fee;
        uint256 price;
        address payable owner;
        address payable creator;
        bool isApproved;
        bool isLocked;
    }

    event CreateCollection(uint256 id, string name, string symbol, uint256 fee, uint256 price, address indexed collection, address indexed creator, address indexed owner);

    modifier validCreateCollectionParams(string memory name, string memory symbol, address nftCollection) {
        require(bytes(name).length != 0, "collection name should exist");
        require(bytes(symbol).length != 0, "collection symbol should exist");
        require(!_collectionNameExists[name], "collection should have unique name");
        require(!_collectionSymbolExists[symbol], "collection should have unique symbol");
        require(!_collectionAddressExists[nftCollection], "collection should not be deployed before");
        _;
    }

    // collections block
    function createCollection(
        string memory name,
        string memory symbol,
        string memory description,
        uint256 fee,
        uint256 price,
        address nftCollection,
        address payable owner
    ) external nonReentrant validCreateCollectionParams(name, symbol, nftCollection) {
        _collectionCounter++;

        Collection storage newCollection = _collections[_collectionCounter];

        newCollection.name = name;
        newCollection.symbol = symbol;
        newCollection.description = description;
        newCollection.nftCollection = NFTCollection(nftCollection);
        newCollection.fee = fee;
        newCollection.price = price;
        newCollection.owner = payable(owner);
        newCollection.creator = payable(msg.sender);

        _collectionNameExists[name] = true;
        _collectionSymbolExists[symbol] = true;
        _collectionAddressExists[nftCollection] = true;

        _collectionsNames[name] = _collectionCounter;
        _collectionsSymbols[symbol] = _collectionCounter;

        emit CreateCollection(_collectionCounter, name, symbol, fee, price, nftCollection, msg.sender, owner);
    }

    // collection getters
    function getCollectionCounter() public view returns (uint256) {
        return _collectionCounter;
    }

    function getCollection(uint256 _collectionId) public view returns (Collection memory) {
        require(_collectionId > 0 && _collectionId <= _collectionCounter, "collection is not exist");
        return _collections[_collectionId];
    }

    function getCollectionIdByName(string memory _collectionName) public view returns (uint256) {
        require(bytes(_collectionName).length != 0, "collection name should exist");
        return _collectionsNames[_collectionName];
    }

    function getCollectionBySymbol(string memory _collectionSymbol) public view returns (Collection memory) {
        require(bytes(_collectionSymbol).length != 0, "collection symbol should exist");
        uint256 _collectionId = _collectionsSymbols[_collectionSymbol];
        return _collections[_collectionId];
    }

    function stringsEquals(string memory s1, string memory s2) private pure returns (bool) {
        bytes memory b1 = bytes(s1);
        bytes memory b2 = bytes(s2);
        uint256 l1 = b1.length;
        if (l1 != b2.length) return false;
        for (uint256 i=0; i<l1; i++) {
            if (b1[i] != b2[i]) return false;
        }
        return true;
    }

    modifier validEditCollectionParams(string memory name, string memory symbol, address nftCollection) {
        require(bytes(name).length != 0, "collection name should exist");
        require(bytes(symbol).length != 0, "collection symbol should exist");
        require(_collectionAddressExists[nftCollection], "collection should be deployed before");
        _;
    }

    event EditCollection(uint256 id, string  name, string  symbol, uint256 fee, address indexed collection, address indexed creator, address indexed owner);

    function editCollection(
        uint256 id,
        string memory name,
        string memory symbol,
        string memory description,
        uint256 fee,
        uint256 price,
        address nftCollection,
        address payable owner)  external nonReentrant validEditCollectionParams(name, symbol, nftCollection) {

            require(msg.sender == owner, "only owner can change collection");

            Collection storage collection = _collections[id];

            require(bytes(collection.name).length != 0);

            if (!stringsEquals(collection.name, name)) {
                delete _collectionNameExists[collection.name];
                collection.name = name;
                _collectionNameExists[name] = true;
            }

            if (!stringsEquals(collection.symbol, symbol)) {
                delete _collectionSymbolExists[collection.symbol];
                collection.symbol = symbol;
                _collectionSymbolExists[symbol] = true;
            }

            if (!stringsEquals(collection.description, description)) {
                collection.description = description;
            }

            if (collection.fee != fee) {
                collection.fee = fee;
            }

            if (collection.price != price) {
                collection.price = price;
            }

            emit EditCollection(
                id,
                name,
                symbol,
                fee,
                nftCollection,
                msg.sender,
                owner
            );
    }

    // ##############################################################

    // collectible block
    mapping(uint256 => mapping (uint256 => Collectible)) private _collectibles;
    mapping(uint256 => uint256)    private _collectionCollectibleCount;

    struct Collectible {
        uint256    id;
        uint256    collectionId;
        uint256[]  tokenIds;
        address    payable owner;
        address    payable creator;
        bool       isAuction;
        NFTAuction nftAuction;
    }

    event CreateCollectible(uint256 id, uint256 collectionId, uint256[] tokenIds, address indexed owner, address indexed creator, bool isAuction, address indexed auction);

    function createCollectible(uint256[] memory _tokenIds, uint256 _collectionId, bool _isAuction, address _nftAuction) external nonReentrant {
        require(_tokenIds.length > 0, "must have token");
        require(_collectionId > 0, "must have collection");
        require(msg.sender != address(0), "Invalid sender address");
        require(address(this) != address(0), "Invalid receiver address");

        Collection storage collection = _collections[_collectionId];

        uint length = _tokenIds.length;

        // Batch transfer all of the tokens at once
        for (uint i = 0; i < length; i++) {
            // Pre-approve the contract for all of the tokens being transferred
            collection.nftCollection.approve(address(this), _tokenIds[i]);
            collection.nftCollection.transferFrom(msg.sender, address(this), _tokenIds[i]);

            // Optional: Check that all of the tokens were transferred successfully
            require(collection.nftCollection.ownerOf(_tokenIds[i]) == address(this), "Token transfer failed");

        }

        // collection counter
        _collectionCollectibleCount[_collectionId]++;

        // add token to catalog
        _collectibles[_collectionId][_collectionCollectibleCount[_collectionId]] = Collectible(
            _collectionCollectibleCount[_collectionId],
            _collectionId,
            _tokenIds,
            payable(msg.sender),
            payable(msg.sender),
            _isAuction,
            NFTAuction(_nftAuction)
        );

        emit CreateCollectible(
            _collectionCollectibleCount[_collectionId],
            _collectionId,
            _tokenIds,
            msg.sender,
            msg.sender,
            _isAuction,
            _nftAuction
        );
    }

    // get tokens count from collection
    function getCollectibleCount(uint256 _collectionId) public view returns (uint) {
        require(_collectionId > 0 && _collectionId <= _collectionCounter, "collection must exist");
        return _collectionCollectibleCount[_collectionId];
    }

    // get token from collection
    function getCollectible(uint256 _collectionId, uint256 _collectibleId) public view returns (Collectible memory) {
        require(_collectionId > 0 && _collectionId <= _collectionCounter, "collection must exist");
        require(_collectibleId > 0 && _collectibleId <= _collectionCollectibleCount[_collectionId], "token must exist");
        return _collectibles[_collectionId][_collectibleId];
    }

    // auctions
    function startAuction(uint256 _collectionId, uint256 _collectibleId) external nonReentrant {

        require(_collectionId > 0 && _collectionId <= _collectionCounter, "collection must exist");
        require(_collectibleId > 0 && _collectibleId <= _collectionCollectibleCount[_collectionId], "token must exist");

        Collectible storage collectible = _collectibles[_collectionId][_collectibleId];

        require(collectible.id == _collectibleId, "collectible should exist");
        require(collectible.collectionId == _collectionId, "collectible collection should exist");

        require(collectible.nftAuction.itemId() == _collectibleId, "item id must be same");
        require(collectible.nftAuction.collectionId() == collectible.collectionId, "collection id must be same");
        require(msg.sender == collectible.owner, "only the collectible owner can start the auction");

        collectible.nftAuction.startAuction();
    }

    function endAuction(uint256 _collectionId, uint256 _collectibleId) external nonReentrant {

        require(_collectionId > 0 && _collectionId <= _collectionCounter, "collection must exist");
        require(_collectibleId > 0 && _collectibleId <= _collectionCollectibleCount[_collectionId], "token must exist");

        Collectible storage collectible = _collectibles[_collectionId][_collectibleId];

        require(collectible.id == _collectibleId, "collectible should exist");
        require(collectible.collectionId == _collectionId, "collectible collection should exist");

        // require(collectible.nftAuction.tokenId() == collectible.tokenId, "token id must be same");
        require(collectible.nftAuction.collectionId() == collectible.collectionId, "collection id must be same");
        require(msg.sender == collectible.owner, "only the collectible owner can stop the auction");

        collectible.nftAuction.endAuction();
        // transfer just token to highest bidder
        // collection.nftCollection.transferFrom(address(this), collectible.nftAuction.highestBidder(), collectible.tokenId);
    }

        /*
        event BuyCollectible(
            uint256 id,
            uint256 collectionId,
            uint256 tokenId,
            uint256 price,
            uint256 percent,
            address indexed creator,
            address indexed buyer,
            address indexed owner,
            bool    isAuction,
            bool    fulfilled,
            bool    cancelled
        );

        event SellCollectible(
            uint256 id,
            uint256 collectionId,
            uint256 tokenId,
            uint256 price,
            uint256 percent,
            address indexed creator,
            address indexed buyer,
            address indexed owner,
            bool    isAuction,
            bool    fulfilled,
            bool    cancelled
        );

        event CancelCollectible(uint256 collectionId, uint256 id, address owner);

        event RevertCancelCollectible(uint256 collectionId, uint256 id, address owner);

        event ClaimFunds(address user, uint256 amount);

        function buyCollectible(uint256 _collectionId, uint256 _collectibleId) external payable nonReentrant {
            require(_collectionId > 0 && _collectionId <= _collectionsCount, "collection must exist");
            require(_collectibleId > 0 && _collectibleId <= _collectionCollectibleCount[_collectionId], "token must exist");

            Collection  storage collection = _collections[_collectionId];
            Collectible storage collectible = _collectibles[_collectionId][_collectibleId];

            require(collection.id == _collectionId, "collection must exist");
            require(collectible.id == _collectibleId, "collectible should exist");


            require(!collectible.isAuction, "can buy only non-auction collectible");

            // require(collectible.owner != msg.sender, "The owner of the offer cannot fill it");
            require(!collectible.fulfilled, "an offer cannot be fulfilled twice");
            require(!collectible.cancelled, "cancelled offer cannot be fulfilled");

            uint256 totalPrice = collectible.price.add(collectible.price.mul(collection.fee).div(1e18).div(100));
            uint256 percent = totalPrice.sub(collectible.price);

            require(msg.value == totalPrice, "amount should match with the NFT Price");

            // send funds to token owner
            collectible.owner.transfer(collectible.price);

            // send percent to fee account
            _owner.transfer(percent);

            // transfer token from collection to new owner
            collection.nftCollection.transferFrom(address(this), msg.sender, collectible.tokenId);

            collectible.owner = payable(msg.sender);
            collectible.fulfilled = true;

            _userFunds[collectible.owner] += msg.value;

            emit BuyCollectible(
                collectible.id,
                collectible.collectionId,
                collectible.tokenId,
                collectible.price,
                percent,
                collectible.creator,
                msg.sender,
                collectible.owner,
                collectible.isAuction,
                false,
                false
            );
        }

        function sellCollectible(uint256 _collectionId, uint256 _collectibleId, uint256 _collectiblePrice) external payable nonReentrant {
            require(_collectionId > 0 && _collectionId <= _collectionsCount, "collection must exist");
            require(_collectibleId > 0 && _collectibleId <= _collectionCollectibleCount[_collectionId], "token must exist");

            Collection  storage collection = _collections[_collectionId];
            Collectible storage collectible = _collectibles[_collectionId][_collectibleId];

            require(collection.id == _collectionId, "collection must exist");
            require(collectible.id == _collectibleId, "collectible should exist");


            require(!collectible.isAuction, "can sell only non-auction collectible");

            require(collectible.owner == msg.sender, "only owner can sell collectible");
            require(collectible.fulfilled, "collectible must be fulfilled");
            require(!collectible.cancelled, "cancelled offer cannot be sell");

            // transfer token from collection to new owner
            collection.nftCollection.transferFrom(msg.sender, address(this), collectible.tokenId);

            collectible.owner = payable(msg.sender);
            collectible.fulfilled = false;
            collectible.price = _collectiblePrice;

            uint256 totalPrice = collectible.price.add(collection.fee.mul(collectible.price).div(100));
            uint256 percent = totalPrice.sub(collectible.price);

            emit SellCollectible(
                collectible.id,
                collectible.collectionId,
                collectible.tokenId,
                collectible.price,
                percent,
                collectible.creator,
                msg.sender,
                collectible.owner,
                collectible.isAuction,
                collectible.fulfilled,
                collectible.cancelled
            );
        }

        // cancel listing token
        function cancelCollectible(uint256 _collectionId, uint256 _collectibleId) external payable nonReentrant {
            require(_collectionId > 0 && _collectionId <= _collectionsCount, "collection must exist");
            require(_collectibleId > 0 && _collectibleId <= _collectionCollectibleCount[_collectionId], "token must exist");

            Collection  storage collection = _collections[_collectionId];
            Collectible storage collectible = _collectibles[_collectionId][_collectibleId];

            require(collection.id == _collectionId, "collection must exist");
            require(collectible.id == _collectibleId, "collectible should exist");


            require(!collectible.isAuction, "can cancel only non-auction collectible");

            require(collectible.owner == msg.sender, "only owner can cancel collectible");
            require(!collectible.fulfilled, 'A fulfilled offer cannot be cancelled');
            require(!collectible.cancelled, 'An offer cannot be cancelled twice');

            collection.nftCollection.transferFrom(address(this), msg.sender, collectible.id);
            collectible.cancelled = true;

            emit CancelCollectible(_collectionId, _collectibleId, msg.sender);
        }


        function revertCancelCollectible(uint256 _collectionId, uint256 _collectibleId) external payable nonReentrant {
            require(_collectionId > 0 && _collectionId <= _collectionsCount, "collection must exist");
            require(_collectibleId > 0 && _collectibleId <= _collectionCollectibleCount[_collectionId], "token must exist");

            Collection  storage collection = _collections[_collectionId];
            Collectible storage collectible = _collectibles[_collectionId][_collectibleId];

            require(collection.id == _collectionId, "collection must exist");
            require(collectible.id == _collectibleId, "collectible should exist");

            require(collectible.owner == msg.sender, "offer can only be reverted by the owner");
            require(!collectible.fulfilled, "fulfilled offer cannot be reverted");
            require(collectible.cancelled, "offer cannot be reverted if not cancelled");

            collection.nftCollection.transferFrom(msg.sender, address(this), collectible.id);
            collectible.cancelled = false;

            emit RevertCancelCollectible(_collectionId, _collectibleId, msg.sender);
        }

        function claimFunds() external payable nonReentrant {
            require(_userFunds[msg.sender] > 0, 'This user has no funds to be claimed');

            payable(msg.sender).transfer(_userFunds[msg.sender]);
            emit ClaimFunds(msg.sender, _userFunds[msg.sender]);
            _userFunds[msg.sender] = 0;
        }

        // Fallback: reverts if Ether is sent to this smart-contract by mistake
        fallback () external {
            revert();
        }*/
}

