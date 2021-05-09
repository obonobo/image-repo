import { Button } from "@material-ui/core";
import axios from "axios";
import { ChangeEvent, useCallback, useRef } from "react";
import styled from "styled-components";
import { urlFor } from "../util/utils";

const uploadFile = async (filename: string, b64File: string) => {
  const req = axios({
    method: "post",
    url: urlFor("/images"),
    headers: { "Content-Type": "application/json" },
    data: {
      file: {
        filename,
        bytes: b64File,
      },
    },
  });
  const res = await req;
  return res.data;
};

const Root = styled.div`
  flex: unset;
  max-width: 90vw;
  min-width: 590px;
  height: 8em;
  margin: 1em 0;
  border-radius: 1em;
  border: 1px solid rgba(128, 128, 128, 0.521);
  padding: 1em;
  display: flex;
  place-content: center;
  place-items: center;

  & > span {
    margin-right: 0.5em;
  }
`;

const UploadButtonBase = styled(Button).attrs({
  variant: "contained",
  color: "secondary",
  component: "label",
})`
  height: 2em;
`;

const toBase64 = (file: File): Promise<string | ArrayBuffer> =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = (e) => rej(e);
  });

const UploadFile = ({
  refresh = () => {
    /* noop */
  },
}: {
  refresh?: () => void;
}): JSX.Element => {
  const input = useRef(null);

  const handleClick = useCallback(
    () => input.current && input.current.click(),
    [input]
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();
      const f = e.target.files[0];
      toBase64(f)
        .then((encoded) => {
          uploadFile(f.name, encoded as string)
            .then(refresh)
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    },
    [refresh]
  );

  return (
    <Root>
      <span>
        <UploadButtonBase onClick={handleClick}>
          Upload File
          <input hidden ref={input} type="file" onChange={handleFileChange} />
        </UploadButtonBase>
      </span>
      {/* or drag file here to upload */}
    </Root>
  );
};

export default UploadFile;
