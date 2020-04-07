
var Tasks = require('../models/todo.model')
let chai = require('chai'),
expect = chai.expect
var helper = require('../helpers/todo.helper')

var mainObj ={}


describe('GET no data', () => {
  beforeEach((done) => {
    Tasks.deleteMany({}, (err) => {
      done();
    });
  })
  it('returns empty array', async function () {
    let result = await helper.list()
    chai.assert.deepEqual(result.data, [], "empty array since database is empty");
  });
  it('returns null', async function () {
    let result = await helper.getRecord()
    chai.assert.deepEqual(result.data, null, "null since database is empty");
  });
})

describe('/POST ', () => {
  it('returns inserted object', async function () {
    let result = await helper.insert("groceries","tomatoes and onions")
    expect(result.data).to.include.property('_id');
    expect(result.data).to.include.property('taskName');
    expect(result.data).to.include.property('taskDescription');
    });
});

describe('GET API WITH DATA', () => {
  it('returns list ', async function () {
    let result = await helper.list()
    expect(result.data[0]).to.include.property('_id');
    expect(result.data[0]).to.include.property('taskName');
    expect(result.data[0]).to.include.property('taskDescription');
    mainObj["_id"] = result.data[0]._id
    });
  it('returns task details', async function () {
    let result = await helper.getRecord(mainObj["_id"])
    expect(result.data).to.include.property('_id');
    expect(result.data).to.include.property('taskName');
    expect(result.data).to.include.property('taskDescription');
  });
})

describe('PATCH',()=>{
  it('updates a given _id',async function(){
    let result = await helper.update(mainObj["_id"],"updatedtask","updatedDescription")
    expect(result.data).to.include.property('_id');
    expect(result.data).to.include.property('taskName');
    expect(result.data).to.include.property('taskDescription');
  })
})

describe('DELETE',()=>{
  it('deletes a given _id',async function(){
    let result = await helper.delete(mainObj["_id"])
    expect(result.data).to.eql("success")
  })
  it('delete _id not found',async function(){
    let result = await helper.delete(mainObj["_id"])
    expect(result.data).to.be.a('null')
  })
})



