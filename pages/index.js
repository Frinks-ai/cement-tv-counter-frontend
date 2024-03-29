import { useContext, useEffect, useState } from 'react';
import Container from 'styles/homepage.styles';
import { SocketContext } from 'context/SocketContext';
import {
  BELT_ID,
  CONFIGURE_PRINTING_BELT,
  SHOW_LOADER_COUNT
} from 'utils/constants';

const Index = () => {
  const socket = useContext(SocketContext);
  const [set, setSet] = useState(0);
  const [actual, setActual] = useState(0);
  const [transactionId, setTransactionId] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState(null);

  useEffect(() => {
    socket.on('bag-entry', data => {
      if (data?.printing_belt_id === BELT_ID || BELT_ID === data?.belt_id) {
        setSet(data?.count);
      }
    });
    socket.on('tag-entry', data => {
      const transaction_id = parseInt(data?.transaction_id, 10);
      if (BELT_ID === data?.belt_id && !SHOW_LOADER_COUNT) {
        setSet(data?.tag_count);
      }
    });
    socket.on('service', data => {
      if (
        data?.bag_counting_belt_id === BELT_ID ||
        data?.linked_printing_belt === BELT_ID
      ) {
        const transaction_id = parseInt(data?.id, 10);
        const vehicle_number =
          data?.vehicle_type === 1 ? data?.wagon_no : data?.licence_number;
        const actual_count = parseInt(data?.bag_count_limit, 10);
        setTransactionId(transaction_id);
        setVehicleNumber(vehicle_number);
        setActual(actual_count);
      }
    });
    socket.on('bag-done', data => {
      const transaction_id = parseInt(data?.transaction_id, 10);
      if (transactionId === transaction_id) {
        setSet(0);
        setActual(0);
        setTransactionId(null);
        setVehicleNumber(null);
      }
    });
    socket.on('bag-update', data => {
      const transaction_id = parseInt(data?.transaction_id, 10);
      if (transactionId === transaction_id) {
        setActual(data?.new_bag_limit);
      }
    });
  }, [socket, transactionId]);

  return (
    <Container>
      <div className="vehicle-number">{transactionId ? vehicleNumber : ''}</div>
      <div className="current-count">
        <div className="count-container">
          {transactionId || set ? (
            <>
              <span>Actual - </span>
              {set}
            </>
          ) : (
            <p>Waiting for shipment...</p>
          )}
        </div>
      </div>
      <div className="total-limit">
        <div className="count-container">
          {transactionId ? (
            <>
              <span>Set - </span>
              {actual}
            </>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

export default Index;
