import styled from "styled-components";

export const MaintenanceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const MaintenanceMessage = styled.div`
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  
  h1 {
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
  }
  
  p {
    color: #666;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  p:last-child {
    margin-bottom: 0;
    font-weight: 500;
    color: #555;
  }
`;