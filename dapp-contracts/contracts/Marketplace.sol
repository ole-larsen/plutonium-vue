// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./NFTCollection.sol";

contract Marketplace is ReentrancyGuard {
    using SafeMath for uint256;

    // this account is admin
    address payable private immutable owner;

    // market name
    string private name;

    // market fee
    uint private fee;

    mapping (address => uint) private _userFunds;

    constructor(string memory _name, uint _fee) {
        name = _name;
        owner = payable(msg.sender);
        fee = _fee;
    }

    // public getters

    // 1. Get market owner
    function getOwner() public view returns (address) {
        return owner;
    }

    // 2. Get market name
    function getName() public view returns (string memory) {
        return name;
    }

    // 3. Get market fee
    function getFee() public view returns (uint) {
        return fee;
    }

    // 4. Get userFunds
    function getUserFunds(address _owner) public view returns (uint) {
        return _userFunds[_owner];
    }

    // public setters

    // 1. Owner can change name
    function setName(string memory _name) public {
        require(msg.sender == owner);
        require(bytes(_name).length != 0);
        name = _name;
    }

    // 2. Owner can change fees
    function setFee(uint _fee) public {
        require(_fee > 0);
        require(msg.sender == owner);
        fee = _fee;
    }

    // This market should have different collections

    // how many collections exists
    uint private _collectionsCount;

    struct Collection {
        uint          id;
        string        name;
        string        symbol;
        string        description;
        NFTCollection nftCollection;
        uint          fee;
        uint          price;
        address       payable owner;
        address       payable creator;
        bool          fulfilled;
        bool          cancelled;
    }

    // mapping collections by name to prevent create collections with existing name
    mapping(string => bool)        private _collectionNameExists;
    mapping(string => bool)        private _collectionSymbolExists;
    mapping(address => bool)       private _collectionAddressExists;
    mapping(uint => Collection)    private _collections;

    // maps for additional getters
    mapping(string => uint)        private _collectionsNames;
    mapping(string => uint)        private _collectionsSymbols;

    // collection event
    event CreateCollection(
        uint    id,
        string  name,
        string  symbol,
        string  description,
        uint    fee,
        uint    price,
        address indexed collection,
        address indexed creator,
        address indexed owner
    );

    // collections getters

    // 1. Get collections count
    function getCollectionsCount() public view returns (uint) {
        return _collectionsCount;
    }

    // 2. Get collection by id
    function getCollection(uint _id) public view returns (Collection memory) {
        require(_id > 0 && _id <= _collectionsCount, "Collection is not exist");
        return _collections[_id];
    }

    // 3. Get collection by name
    function getCollectionByName(string memory _name) public view returns (Collection memory) {
        require(bytes(_name).length != 0);
        uint id = _collectionsNames[_name];
        return _collections[id];
    }

    // 4. Get collection by symbol
    function getCollectionBySymbol(string memory _symbol) public view returns (Collection memory) {
        require(bytes(_symbol).length != 0);
        uint id = _collectionsSymbols[_symbol];
        return _collections[id];
    }


    // collection setters

    // everybody can create unique collection
    function createCollection(string memory _name, string memory _symbol, string memory _description, uint _fee, uint _price, address _nftCollection, address payable _owner) external nonReentrant {
        require(bytes(_name).length != 0);
        require(bytes(_symbol).length != 0);
        require(!_collectionNameExists[_name], "Collection must have unique name");
        require(!_collectionSymbolExists[_symbol], "Collection must have unique symbol");
        require(!_collectionAddressExists[_nftCollection], "Collection must be not deployed before");

        _collectionsCount++;

        _collections[_collectionsCount] = Collection(
            _collectionsCount,
            _name,
            _symbol,
            _description,
            NFTCollection(_nftCollection),
            _fee,
            _price,
            payable(_owner),
            payable(msg.sender),
            false,
            false
        );

        _collectionNameExists[_name] = true;
        _collectionSymbolExists[_symbol] = true;
        _collectionAddressExists[_nftCollection] = true;

        _collectionsNames[_name] = _collectionsCount;
        _collectionsSymbols[_symbol] = _collectionsCount;

        // create new event
        emit CreateCollection(_collectionsCount, _name, _symbol, _description, _fee, _price, _nftCollection, msg.sender, _owner);
    }

    event EditCollection(
        uint    id,
        string  name,
        string  symbol,
        string  description,
        uint    fee,
        uint    price,
        address indexed collection,
        address indexed creator,
        address indexed owner
    );

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

    function editCollection(uint _id, string memory _name, string memory _symbol, string memory _description, uint _fee, uint _price, address _nftCollection, address payable _owner)  external nonReentrant {
        require(bytes(_name).length != 0);
        require(bytes(_symbol).length != 0);
        require(_collectionNameExists[_name], "Collection must have unique name");
        require(_collectionSymbolExists[_symbol], "Collection must have unique symbol");
        require(_collectionAddressExists[_nftCollection], "Collection must be not deployed before");
        require(msg.sender == _owner, "Only owner can change data");

        // find collection
        Collection storage collection = _collections[_id];

        require(bytes(collection.name).length != 0);

        if (!stringsEquals(collection.name, _name)) {
            collection.name = _name;
        }

        if (!stringsEquals(collection.symbol, _symbol)) {
            collection.symbol =_symbol;
        }

        if (!stringsEquals(collection.description, _description)) {
            collection.description = _description;
        }

        if (collection.fee != _fee) {
            collection.fee = _fee;
        }

        if (collection.price != _price) {
            collection.price = _price;
        }
        emit EditCollection(_id, _name, _symbol, _description, _fee, _price, _nftCollection, msg.sender, _owner);
    }

    // collectibles
    struct Collectible {
        uint id;
        uint collectionId;
        uint tokenId;
        uint price;
        address payable owner;
        address payable creator;
        bool fulfilled;
        bool cancelled;
        bool auction;
    }

    mapping(uint => uint) private _collectionCollectibleCount;
    mapping(uint => mapping (uint => Collectible)) private _collectibles;

    event CreateCollectible(
        uint    id,
        uint    collectionId,
        uint    tokenId,
        uint    price,
        address indexed owner,
        address indexed creator,
        bool    fulfilled,
        bool    cancelled,
        bool    auction
    );

    // get tokens count from collection
    function getCollectibleCount(uint _collectionId) public view returns (uint) {
        require(_collectionId > 0 && _collectionId <= _collectionsCount, "Collection must exist");
        return _collectionCollectibleCount[_collectionId];
    }

    // get token from collection
    function getCollectible(uint _collectionId, uint _id) public view returns (Collectible memory) {
        require(_collectionId > 0 && _collectionId <= _collectionsCount, "Collection must exist");
        require(_id > 0 && _id <= _collectionCollectibleCount[_collectionId], "token must exist");
        return _collectibles[_collectionId][_id];
    }

    // add tokens to collection
    function createCollectible(uint _tokenId, uint _collectionId, uint _price, bool _auction) external nonReentrant {
        require(_tokenId > 0, "Must have token");
        require(_collectionId > 0, "Must have collection");
        require(_price > 0, "Price must be greater than 0");

        // find collection
        Collection storage collection = _collections[_collectionId];

        require(bytes(collection.name).length != 0);

        collection.nftCollection.transferFrom(msg.sender, address(this), _tokenId);

        // collection counter
        _collectionCollectibleCount[_collectionId]++;

        // add token to catalog
        _collectibles[_collectionId][_collectionCollectibleCount[_collectionId]] = Collectible(
            _collectionCollectibleCount[_collectionId],
            _collectionId,
            _tokenId,
            _price,
            payable(msg.sender),
            payable(msg.sender),
            false,
            false,
            _auction
        );

        emit CreateCollectible(
            _collectionCollectibleCount[_collectionId],
            _collectionId,
            _tokenId,
            _price,
            msg.sender,
            msg.sender,
            false,
            false,
            _auction
        );
    }

    event BuyCollectible(
        uint    id,
        uint    collectionId,
        uint    tokenId,
        uint    price,
        uint    percent,
        address indexed creator,
        address indexed buyer,
        address indexed owner,
        bool    fulfilled,
        bool    cancelled
    );

    function buyCollectible(uint _collectionId, uint _id) external payable nonReentrant {
        require(_collectionId > 0 && _collectionId <= _collectionsCount, "Collection must exist");
        require(_id > 0 && _id <= _collectionCollectibleCount[_collectionId], "token must exist");

        Collectible storage collectible = _collectibles[_collectionId][_id];
        Collection  storage collection = _collections[_collectionId];

        require(collectible.id == _id, "The offer must exist");
        require(collection.id == _collectionId, "Collection must exist");

        // require(collectible.owner != msg.sender, "The owner of the offer cannot fill it");
        require(!collectible.fulfilled, "An offer cannot be fulfilled twice");
        require(!collectible.cancelled, "A cancelled offer cannot be fulfilled");

        uint totalPrice = collectible.price.add(collection.fee.mul(collectible.price).div(100));
        uint percent = totalPrice.sub(collectible.price);

        require(msg.value == totalPrice, "The ETH amount should match with the NFT Price");

        // send funds to token owner
        collectible.owner.transfer(collectible.price);

        // send percent to fee account
        owner.transfer(percent);

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
            false,
            false
        );
    }

    event SellCollectible(
        uint    id,
        uint    collectionId,
        uint    tokenId,
        uint    price,
        uint    percent,
        address indexed creator,
        address indexed buyer,
        address indexed owner,
        bool    fulfilled,
        bool    cancelled
    );

    function sellCollectible(uint _collectionId, uint _id, uint _price) external payable nonReentrant {
        require(_collectionId > 0 && _collectionId <= _collectionsCount, "Collection must exist");
        require(_id > 0 && _id <= _collectionCollectibleCount[_collectionId], "Token must exist");
        require(_price > 0, "Price must be greater than 0");

        Collectible storage collectible = _collectibles[_collectionId][_id];
        Collection  storage collection = _collections[_collectionId];

        require(collectible.id == _id, "Collectible must exist");
        require(collection.id == _collectionId, "Collection must exist");

        require(collectible.owner == msg.sender, "Only owner can sell collectible");
        require(collectible.fulfilled, "Collectible must be fulfilled");
        require(!collectible.cancelled, "A cancelled offer cannot be fulfilled");

        // transfer token from collection to new owner
        collection.nftCollection.transferFrom(msg.sender, address(this), collectible.tokenId);

        collectible.owner = payable(msg.sender);
        collectible.fulfilled = false;
        collectible.price = _price;

        uint totalPrice = collectible.price.add(collection.fee.mul(collectible.price).div(100));
        uint percent = totalPrice.sub(collectible.price);

        emit SellCollectible(
            collectible.id,
            collectible.collectionId,
            collectible.tokenId,
            collectible.price,
            percent,
            collectible.creator,
            msg.sender,
            collectible.owner,
            collectible.fulfilled,
            collectible.cancelled
        );
    }

    event CancelCollectible(uint collectionId, uint id, address owner);

    // cancel listing token
    function cancelCollectible(uint _collectionId, uint _id) external payable nonReentrant {
        require(_collectionId > 0 && _collectionId <= _collectionsCount, "Collection must exist");
        require(_id > 0 && _id <= _collectionCollectibleCount[_collectionId], "token must exist");

        Collectible storage collectible = _collectibles[_collectionId][_id];
        Collection  storage collection = _collections[_collectionId];

        require(collectible.id == _id, "The offer must exist");
        require(collection.id == _collectionId, "Collection must exist");

        require(collectible.owner == msg.sender, 'The offer can only be canceled by the owner');
        require(collectible.fulfilled == false, 'A fulfilled offer cannot be cancelled');
        require(collectible.cancelled == false, 'An offer cannot be cancelled twice');
        collection.nftCollection.transferFrom(address(this), msg.sender, collectible.id);
        collectible.cancelled = true;
        emit CancelCollectible(_collectionId, _id, msg.sender);
    }

    event RevertCancelCollectible(uint collectionId, uint id, address owner);

    function revertCancelCollectible(uint _collectionId, uint _id) external payable nonReentrant {
        require(_collectionId > 0 && _collectionId <= _collectionsCount, "Collection must exist");
        require(_id > 0 && _id <= _collectionCollectibleCount[_collectionId], "token must exist");

        Collectible storage collectible = _collectibles[_collectionId][_id];
        Collection  storage collection = _collections[_collectionId];

        require(collectible.id == _id, "The offer must exist");
        require(collection.id == _collectionId, "Collection must exist");

        require(collectible.owner == msg.sender, 'The offer can only be canceled by the owner');
        require(collectible.fulfilled == false, 'A fulfilled offer cannot be cancelled');
        require(collectible.cancelled == true, 'An offer cannot be reverted if not cancelled');
        collection.nftCollection.transferFrom(msg.sender, address(this), collectible.id);
        collectible.cancelled = false;
        emit RevertCancelCollectible(_collectionId, _id, msg.sender);
    }

    event ClaimFunds(address user, uint amount);

    function claimFunds() external payable nonReentrant {
        require(_userFunds[msg.sender] > 0, 'This user has no funds to be claimed');

        payable(msg.sender).transfer(_userFunds[msg.sender]);
        emit ClaimFunds(msg.sender, _userFunds[msg.sender]);
        _userFunds[msg.sender] = 0;
    }

    // Fallback: reverts if Ether is sent to this smart-contract by mistake
    fallback () external {
        revert();
    }
}
