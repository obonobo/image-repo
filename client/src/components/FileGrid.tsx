/* eslint-disable react/display-name */
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { urlFor } from "../util/utils";
import UploadFile from "./UploadFile";

type File = {
  id: string;
  name?: string;
  file?: string;
  lastModified: string;
  size: number;
  downloadLink: string;
};

const getFileListing = async (): Promise<File[]> => {
  try {
    const got = await axios.get(urlFor("/images"));
    console.log(got.data.data);

    return (got.data.data as File[]).map((f) => ({
      id: f.file,
      name: f.file,
      size: f.size,
      lastModified: f.lastModified,
      downloadLink: urlFor(`/images/${f.file}`),
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
};

const DownloadItemButton = ({ link }: { link: string }) => (
  <Button variant="outlined" color="secondary" href={link}>
    Download
  </Button>
);

const columns = [
  { field: "name", headerName: "Name", width: 130 },
  { field: "size", headerName: "Size", width: 130 },
  { field: "lastModified", headerName: "Last Modified", width: 200 },
  {
    field: "downloadLink",
    headerName: "Download",
    disableClickEventBubbling: true,
    width: 130,
    renderCell: ({ value }) => <DownloadItemButton link={value as string} />,
  },
];

const FileGridBase = styled(DataGrid).attrs({
  columns,
})`
  &&& {
    flex: unset;
    max-width: 90vw;
    min-width: 590px;
    height: 70vh;
    margin: 0;
  }
`;

const FileGrid = (): JSX.Element => {
  const [files, setFiles] = useState([]);

  const refresh = useCallback(() => {
    getFileListing().then((newFiles) => {
      console.log(newFiles);
      setFiles(newFiles);
    });
  }, [setFiles]);

  useEffect(() => {
    refresh();
    const timeout = setTimeout(refresh, 3000);
    return () => clearTimeout(timeout);
  }, [refresh]);

  return (
    <>
      <UploadFile refresh={refresh} />
      <FileGridBase rows={files} />
    </>
  );
};

export default FileGrid;
