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
import Logo from '../Utilis/Logo';
import Naira from '../Utilis/CustomHooks/Naira';
import getActualAmount from '../Utilis/getActualAmount';

export const AllTransactions = ({ data }: any) => {
  data = data.data;
  return (
    <Box p="1rem">
      <Box h="5rem" mx="auto" w="fit-content" mb="1rem">
        <Logo height="100%" />
      </Box>
      <Text mb="1rem">All Payment History</Text>
      {data?.length == 0 ? (
        <Text textAlign="center">No Transaction Yet</Text>
      ) : (
        <TableContainer w="full" maxH="100%">
          <Table border="1px solid #e5e5e5" variant="simple">
            <Thead>
              <Tr>
                <TableHead name="S/N" />
                <TableHead name="Name" />
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
                      name={`${item?.metadata?.custom_fields?.find(
                        (x: any) => x.variable_name == 'customer_name'
                      ).value}`}
                      full
                      border
                      value="1px solid #e5e5e5"
                    />
                    <TableBody
                      name={Naira(
                        item?.metadata?.custom_fields?.find(
                          (x: any) => x.variable_name == 'actual_price'
                        )?.value || 0
                      )}
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
