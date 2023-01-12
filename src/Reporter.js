import { CloseButton } from "./CloseButton.js";

console.log(window.location.pathname);

export function Reporter({ cid, cidArray, onClose }) {
  return (
    <div className="relative ma4 flex-auto flex items-center">
      <div className="absolute top-0 right-0">
        <CloseButton onClick={onClose} />
      </div>
      <div className="w-100 pa4 ba bg-white">
        <p className="f4 b mv1">
          CID <CopyButton text={cid} title="Copy CID to clipboard" />
        </p>
        <p className="f6 mt1 mb3 truncate">{cid}</p>
        <p className="f4 b mv1">
          IPFS URL{" "}
          <CopyButton
            text={`ipfs://${cid}`}
            title="Copy IPFS URL to clipboard"
          />
        </p>
        <p className="f6 mt1 mb3 truncate">ipfs://{cid}</p>
        <p className="f4 b mv1">
          Gateway URL{" "}
          <CopyButton
            text={`https://nftstorage.link/ipfs/${cid}`}
            title="Copy gateway URL to clipboard"
          />
        </p>
        <a
          className="db f6 mt1 mb3 black truncate"
          href={`https://nftstorage.link/ipfs/${cid}`}
          target="_blank"
          rel="noreferrer"
        >
          https://nftstorage.link/ipfs/{cid}
        </a>
        <p className="f4 b mv1">
          Cid Array Length: {cidArray.length}{" "}
          <CopyButton text={cidArray} title="Copy Cid Array clipboard" />
        </p>
        <p className="f6 mt1 mb3 truncate">{cidArray}</p>
        <DownloadButton cidArray={cidArray} />
      </div>
    </div>
  );
}

function CopyButton({ text, title }) {
  const handleClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
  };
  return (
    <button
      title={title || "Copy to clipboard"}
      class="input-reset bw0 bg-transparent pointer"
      onClick={handleClick}
    >
      <svg
        viewBox="0 0 11 11"
        fill="none"
        tab-index="-1"
        xmlns="http://www.w3.org/2000/svg"
        className="w1 h1"
      >
        <path
          d="M1 1H8V8H1V1Z"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 3.077V9C10 9.26521 9.89467 9.51957 9.70713 9.7071C9.5196 9.89464 9.26524 10 9.00003 10H3.07703"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}

function DownloadButton({ cidArray }) {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.createElement("a");
    let orderedCidArray = cidArray.sort(function (a, b) {
      let aLastSlash = a.lastIndexOf("/");
      let bLastSlash = b.lastIndexOf("/");
      let aNum = parseInt(a.slice(aLastSlash + 1, a.length - 5));
      let bNum = parseInt(b.slice(bLastSlash + 1, b.length - 5));
      return aNum - bNum;
    });
    const textFile = new Blob(orderedCidArray, {
      type: "text/csv",
    }); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(textFile);
    element.download = "ipfsFile.csv";
    document.body.appendChild(element);
    element.click();
  };
  return <button onClick={handleClick}> Download</button>;
}
