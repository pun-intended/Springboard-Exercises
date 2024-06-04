describe("Servers test (with setup and tear-down)", function() {

});

let serverList = ['wallace', 'gromit', 'seth', 'dean', 'kevin', 'scott'];

function populateServerTable(){
    serverList.forEach(element => {
      serverNameInput.value = element;
      submitServerInfo();
    });
}

describe("SubmitServerInfo functionality tests", function(){
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should reset input field on submitServerInfo()', function(){
    submitServerInfo();
    expect(serverNameInput.value).toEqual('');
  })

  it('should increment serverId after each submission', function(){
    populateServerTable();
    expect(serverId).toBe(serverList.length);
  })
})

describe("updateServerTable test", function(){

  it('should append server input to serverTable', function(){
    let testName = 'Terry'
    serverNameInput.value = testName;
    submitServerInfo();
    updateServerTable();
    expect(serverTbody.rows.length).toEqual(1);
    expect(serverTbody.rows[0].cells[0].innerText).toEqual(testName);
  });

  it('should append all inputs to serverTable', function(){
    populateServerTable();
    expect(serverTbody.rows.length).toEqual(serverList.length);
  })
})

/**
 - Write tests for `appendDeleteBtn(tr)`
    
  You may notice the difficulty of simulating a click with vanilla 
  javascript so do not spend too much time on testing the html after 
  the DOM is updated (later we will study approaches for this with 
  other libraries).
 */

afterEach(function() {
  allServers = {};
  serverId = 0;
  updateServerTable();
});