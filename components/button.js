import styled from "styled-components"

const StyledButton = styled.button`
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  margin: 1em auto;
  text-align: center;
  &:hover {
    background-color: #2c974b;
  }
  
`

export default function Button({children, onclick}) {
  return (
    <StyledButton onClick={onclick}>{children}</StyledButton>
  ) 
}