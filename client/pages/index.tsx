import styled from "styled-components";
import FileGridBase from "../src/components/FileGrid";

const Content = styled.div`
  justify-content: center;
  flex-direction: column;
  justify-items: center;
  display: flex;

  & > * {
    margin-top: 7rem;
  }
`;

const Home = (): JSX.Element => (
  <main>
    <Content>
      <FileGridBase />
    </Content>
  </main>
);

export default Home;
