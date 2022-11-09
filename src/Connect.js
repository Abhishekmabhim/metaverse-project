import abi from "./abi/abi.json" assert { type: "json" };

const connect = new Promise((res, rej) => {
    if (typeof window.ethereum == "undefined") {
        rej("Install Matamask");
    }
    window.ethereum.request({ method: "eth_requestAccounts" });


    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.contract(abi, "0xdd2b1025B5508c6ee13A09481eD4C5Ffc9151152");

    web3.eth.getAccounts().then((accounts) => {
         contract.methods
            .totalSupply()
            .call({ from: accounts[0] })
            .then((supply) => {
                contract.methods
                    .getBuildings()
                    .call({ from: accounts[0] })
                    .then((data) =>  {
                        res({ supply: supply, building: data });
                    });
            });
    });
});    

export default connect;