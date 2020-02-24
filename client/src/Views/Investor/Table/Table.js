import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getBoard } from "../../../Actions/board";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { LangContext } from "../../../Context";
import Download from "../Download";
import { device } from "../../../device";

const TableBox = styled.div``;
const Table = styled.table`
  max-width: 100%;
  border-spacing: 1;
  overflow: hidden;
  width: 100%;
  position: relative;
  * {
    position: relative;
  }
  thead tr {
    height: 50px;
    border-bottom: 1px solid #d3d3d3;
    th {
      font-size: 18px;
      text-align: left;
      padding-left: 30px;
      padding-bottom: 20px;
      font-weight: bold;
      ${device.PC990`font-size : 16px;padding-left: 20px;`}
      ${device.PC600`font-size : 14px;padding-left: 10px;`}
    }
    th:nth-child(1) {
      width: 80px;
      text-align: center;
      padding-left: 0;
      ${device.PC990`width : 60px;`}
      ${device.PC600`width : 50px;`}
    }
    th:nth-child(3) {
      width: 160px;
      ${device.PC990`width : 120px;`}
      ${device.PC600`width : 100px;`}
    }
    th:nth-child(4) {
      width: 160px;
      padding-left: 30px;
      ${device.PC990`width : 120px;`}
      ${device.PC600`width : 100px;`}
    }
  }
  tbody {
    tr {
      height: 50px;
      font-size: 17px;
      line-height: 1.5;
      font-weight: unset;
      border-bottom: 1px solid #d3d3d3;
      ${device.PC990`font-size: 15px;`}
      ${device.PC600`font-size: 13px;`}
      td {
        padding: 20px 0 20px 30px;
        ${device.PC990`padding-left : 20px;`}
        ${device.PC600`padding-left : 10px;`}
        &:last-child {
          display: flex;
          a {
            display: inline-flex;
          }
        }
        &:nth-child(1) {
          text-align: center;
          padding-left: 0;
        }
        > * {
          padding: 0 5px;
          font-size: 18px;
          ${device.PC990`font-size: 15px;`}
          ${device.PC600`font-size: 13px;`}
        }
      }
    }
  }
`;
const Hit = styled.span`
  background: #fc5454;
  color: #fff;
  font-size: 13px !important;
  font-weight: bold;
  min-width: 20px;
  border: 1px solid #ffadad;
  border-radius: 5px 5px;
  padding: 2px 6px;
`;
const DetailLink = styled(Link)`
  display: inline-block;
  padding: 0 5px;
  font-size: 18px;
  min-width: 10px;
  min-height: 10px;
  :hover {
    color: #a5a5a5 !important;
  }
`;
const SignUp = styled.div`
  width: 100%;
  text-align: right;
  margin: 10px auto;
  padding-right: 15px;
`;
const SignLink = styled(Link)`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
  :hover {
    background-color: #15717f;
    color: #fff;
  }
`;
const Paging = styled.div``;
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  ul {
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
    margin: 0;
    li {
      margin: 0;
    }
  }
  .MuiButton-text {
    padding: 0.5rem 0.75rem;
    border: 1px solid #dee2e6;
    min-width: auto;
  }
`;
export default ({ type, history }) => {
  const dispatch = useDispatch();
  const [table, setTable] = useState(true);
  const { lang } = useContext(LangContext);
  const { board, loading, ip } = useSelector(state => ({
    board: state.board.board,
    loading: state.board.loading,
    ip: state.board.ip
  }));
  console.log(type);
  const [page, setPage] = useState(1);

  const formData = {
    page,
    type
  };
  useEffect(() => {
    dispatch(getBoard(formData));
  }, [type, dispatch, table]);
  useEffect(() => {
    if (type !== 1) {
      alert("준비중입니다.");
      history.push("/");
    }
  }, [type]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <TableBox>
        <Table>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Files</th>
            </tr>
          </thead>
          <tbody>
            {board.map((item, i) => (
              <tr key={item.idx}>
                <td>{item.idx}</td>
                <td>
                  <DetailLink to={`/investor/detail/${type}/${item.idx}`}>
                    {item.title}
                  </DetailLink>
                  {ip ? <Hit>{item.read_count}</Hit> : null}
                </td>
                <td>{item.regDate}</td>
                <td>
                  {item.filename1 === "" ? null : (
                    <Download
                      table={table}
                      filename={item.filename1}
                      orgName={item.org_filename1}
                    />
                  )}
                  {item.filename2 === "" ? null : (
                    <Download
                      table={table}
                      filename={item.filename2}
                      orgName={item.org_filename2}
                    />
                  )}
                  {item.filename3 === "" ? null : (
                    <Download
                      table={table}
                      filename={item.filename3}
                      orgName={item.org_filename3}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableBox>
      <SignUp>
        {ip ? (
          <SignLink to={`/investor/write/${type}`}>{lang.investor05}</SignLink>
        ) : null}
      </SignUp>
      <Paging>
        <Nav>
          <ul>
            <li>
              <Button disabled={true}>
                <span aria-hidden="true">«</span>
              </Button>
            </li>
            <li>
              <Button>1</Button>
            </li>
            <li>
              <Button disabled={board.length > 10 * type ? false : true}>
                <span aria-hidden="true">»</span>
              </Button>
            </li>
          </ul>
        </Nav>
      </Paging>
    </>
  );
};
