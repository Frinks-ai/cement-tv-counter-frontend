import styled from '@emotion/styled';

const Container = styled.div`
  .vehicle-number,
  .current-count,
  .total-limit {
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    color: red;
  }

  .current-count {
    font-size: 20vw;

    @media screen and (max-width: 1200px) {
      font-size: 23vw;
    }
  }

  .total-limit {
    font-size: 20vw;

    @media screen and (max-width: 1200px) {
      font-size: 23vw;
    }
  }

  .count-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 50vw;

    p {
      font-size: 8vw;
    }
  }

  .vehicle-number {
    height: 20vh;
    font-size: 6vw;
  }

  span {
    font-size: 6vw;
    font-weigt: 900;
  }
`;

export default Container;
