'use client';
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { IMainForm } from '../Utilis/Schemas';
import { TableHead, TableBody } from '../Utilis/TableData';
import getActualAmount from '../Utilis/getActualAmount';
import Naira from '../Utilis/CustomHooks/Naira';

export const UserTransactions = ({ data }: any) => {
  data = data.data;
  return (
    <Box>
      <Text mb="1rem">Your Payment History</Text>
      {data?.length == 0 ? (
        <Text textAlign="center">No Transaction Yet</Text>
      ) : (
        <TableContainer w="full" maxH="100%">
          <Table border="1px solid #e5e5e5" variant="simple">
            <Thead>
              <Tr>
                <TableHead name="S/N" />
                <TableHead name="Reference" />
                <TableHead name="Amount Paid" />
                <TableHead name="Channel" />
                <TableHead name="Date" />
                <TableHead name="Status" />
              </Tr>
            </Thead>

            <Tbody>
              {data.map((item: any, i: number) => {
                return (
                  <Tr key={i}>
                    <TableBody name={i + 1} border value="1px solid #e5e5e5" />
                    <TableBody
                      name={`${item?.reference}`}
                      full
                      border
                      value="1px solid #e5e5e5"
                    />
                    <TableBody
                      name={Naira(getActualAmount(item?.amount, item?.fees))}
                      border
                      value="1px solid #e5e5e5"
                    />
                    <TableBody
                      name={item?.channel}
                      border
                      value="1px solid #e5e5e5"
                    />
                    <TableBody
                      name={dayjs(data?.paidAt).format('DD/MM/YYYY hh:mm A')}
                      border
                      value="1px solid #e5e5e5"
                    />
                    <TableBody
                      name={item?.status}
                      border
                      value="1px solid #e5e5e5"
                      customColor={
                        item?.status !== 'success' && item?.status !== 'pending'
                      }
                    />
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
