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
      const transaction_id = parseInt(data?.transaction_id, 10);
      console.log(transactionId, transaction_id)
      if (transactionId === transaction_id && SHOW_LOADER_COUNT) {
        setSet(data?.count);
      }
    });
    socket.on('tag-entry', data => {
      const transaction_id = parseInt(data?.transaction_id, 10);
      if (transactionId === transaction_id && !SHOW_LOADER_COUNT) {
        setSet(data?.tag_count);
      }
    });
    socket.on('service', data => {
      // console.log(CONFIGURE_PRINTING_BELT)
      const belt_id = CONFIGURE_PRINTING_BELT
        ? (data?.printing_belt_id)
        : (data?.bag_counting_belt_id);
        // console.log(belt_id, BELT_ID)
      if (belt_id === BELT_ID) {
        const transaction_id = parseInt(data?.id, 10);
        const vehicle_number =
          data?.vehicle_type === 1 ? data?.wagon_no : data?.licence_number;
        const actual_count = parseInt(data?.bag_count_limit, 10);
        setTransactionId(transaction_id);
        setVehicleNumber(vehicle_number);
        setActual(actual_count);
      }
    });
    socket.on('python-stop', data => {
      const transaction_id = parseInt(data?.transaction_id, 10);
      if (transactionId === transaction_id) {
        setSet(0);
        setActual(0);
        setTransactionId(null);
        setVehicleNumber(null);
      }
    });
    socket.on('update', data => {
      const transaction_id = parseInt(data?.transaction_id, 10);
      if (transactionId === transaction_id) {
        setActual(data?.new_limit);
      }
    });
  }, [socket, transactionId]);

  return (
    <Container>
      <div className="vehicle-number">{transactionId ? vehicleNumber : ''}</div>
      <div className="current-count">
        <div className="count-container">
          {transactionId ? (
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
