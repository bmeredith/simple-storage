const SimpleStorage = artifacts.require("SimpleStorage");
const { reverts } = require("truffle-assertions");

contract("SimpleStorage", function (accounts) {

  let ssInstance;
  const [owner, user] = accounts;
  
  beforeEach( async () => {
    ssInstance = await SimpleStorage.new({from: owner});
  });

  describe("Initial deployment", async () => {
    it("should assert true", async function () {
      await SimpleStorage.deployed();
      assert.isTrue(true);
    });
  
    it("was deployed and it's initial value is 0", async () => {
      const storedData = await ssInstance.getStoredData.call();
      assert.equal(storedData, 0, 'Initial state should be zero');
    });
  });

  describe("Functionality", () => {
    it("should store the value 42", async () => {
      await ssInstance.setStoredData(42, { from: owner });

      const storedData = await ssInstance.getStoredData.call();
      assert.equal(storedData, 42, `${storedData} was not stored!`);
    });
  });

  describe("Counter", () => {
    it("should have a default value of 0", async() => {
      const count = await ssInstance.getCount(owner);
      assert.equal(count, 0);
    });

    it("should track count for user", async() => {
      await ssInstance.setStoredData(42, { from: owner });

      const count = await ssInstance.getCount(owner);
      assert.equal(count, 1)
    });

    it("should only allow owner to get count", async () => {
      await ssInstance.setStoredData(42, { from: user });

      await reverts(
        ssInstance.getCount(user, { from: user }),
        "Only the owner can call this."
      );
    });
  });
});
