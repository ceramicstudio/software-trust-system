import { useState, useEffect } from "react";
import { networks } from "../../utils/networks";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import Link from "next/link";
import { EASContractAddress } from "../../utils/utils";

const eas = new EAS(EASContractAddress);

export default function Attest() {
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [ensResolvedAddress, setEnsResolvedAddress] = useState("Dakh.eth");
  const [attesting, setAttesting] = useState(false);
  const [network, setNetwork] = useState("");


 

  return (
    <div className="Container">
      {account && (
        <div className="right">
          <img alt="Network logo" className="logo" src={"/ethlogo.png"} />
          {account.length ? (
            <p style={{ textAlign: "center" }}>
              {" "}
              Connected with: {account.slice(0, 6)}...{account.slice(-4)}{" "}
            </p>
          ) : (
            <p style={{ textAlign: "center" }}> Not connected </p>
          )}
        </div>
      )}

      <div className="GradientBar" />
      <div className="WhiteBox">
        <div className="Title">
          I <b>attest</b> that I met
        </div>

        <div className="InputContainer">
          <input
            className="InputBlock"
            autoCorrect={"off"}
            autoComplete={"off"}
            autoCapitalize={"off"}
            placeholder={"Address/ENS"}
            value={address}
            onChange={(e) => setAddress(e.target.value.toLowerCase())}
          />
          {ensResolvedAddress && (
            <img className="EnsLogo" src={"/ens-logo.png"} />
          )}
        </div>
          <button
            className="MetButton"
            onClick={async () => {
              if (status !== "connected") {
              } else {
                setAttesting(true);
                try {
                  const provider = new ethers.providers.Web3Provider(
                    window.ethereum as unknown as ethers.providers.ExternalProvider
                  );
                  const signer = provider.getSigner();

                  eas.connect(signer);

                  const schemaEncoder = new SchemaEncoder("bool metIRL");
                  const encoded = schemaEncoder.encodeData([
                    { name: "metIRL", type: "bool", value: true },
                  ]);
                  const recipient = address;

                  if(!recipient){
                    alert('Incorrect recipient address');
                    return;
                  }
                  const offchain = await eas.getOffchain();

                  const time = Math.floor(Date.now() / 1000);
                  const offchainAttestation =
                    await offchain.signOffchainAttestation(
                      {
                        recipient: recipient.toLowerCase(),
                        // Unix timestamp of when attestation expires. (0 for no expiration)
                        expirationTime: 0,
                        // Unix timestamp of current time
                        time,
                        revocable: true,
                        version: 1,
                        nonce: 0,
                        schema:
                          "0xc59265615401143689cbfe73046a922c975c99d97e4c248070435b1104b2dea7",
                        refUID:
                          "0x0000000000000000000000000000000000000000000000000000000000000000",
                        data: encoded,
                      },
                      signer
                    );
                  // un-comment the below to process an on-chain timestamp
                  // const transaction = await eas.timestamp(offchainAttestation.uid);
                  // // Optional: Wait for the transaction to be validated
                  // await transaction.wait();
                  const userAddress = await signer.getAddress();
                  console.log(offchainAttestation);
                  const requestBody = {
                    ...offchainAttestation,
                    account: userAddress.toLowerCase(),
                  };
                  const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody),
                  };
                  // call attest api endpoint to store attestation on ComposeDB
                  await fetch("/api/attest", requestOptions)
                    .then((response) => response.json())
                    .then((data) => console.log(data));
                  setAddress("");
                  setAttesting(false);
                } catch (e) {}
                setAddress("");
                setAttesting(false);
              }
            }}
          >
            {attesting
              ? "Attesting..."
              : status === "connected"
              ? "Make Offchain attestation"
              : "Connect wallet"}
          </button>

        {status === "connected" && (
          <>
            <div className="SubText">
              {" "}
              <Link href="/qr">Show my QR code</Link>
            </div>
            <div className="SubText">
              {" "}
              <Link href="/connections">Connections</Link>
            </div>
            <div className="SubText">
              {" "}
              <Link href="/verify">Verify Attestations</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
