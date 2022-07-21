import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FuegoUiProps {}

const StyledFuegoUi = styled.div`
  color: pink;
`;

export function FuegoUi(props: FuegoUiProps) {
  return (
    <StyledFuegoUi>
      <h1>Welcome to FuegoUi!</h1>
    </StyledFuegoUi>
  );
}

export default FuegoUi;
