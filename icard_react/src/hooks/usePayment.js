import { useState } from "react";
import {
  createPaymentApi,
  getPaymentByTableApi,
  closePaymentApi,
  getPaymentsApi,
} from "../api/payment";

export function usePayment() {
  const [error, setError] = useState(null);
  const [loagind, setLoagind] = useState(true);
  const [payments, setPayments] = useState(null);

  const createPayment = async (paymentData) => {
    try {
      return await createPaymentApi(paymentData);
    } catch (error) {
      setError(error);
    }
  };

  const getPaymentByTable = async (idTable) => {
    try {
      return await getPaymentByTableApi(idTable);
    } catch (error) {
      setError(error);
    }
  };

  const closePayment = async (idPayment) => {
    try {
      await closePaymentApi(idPayment);
    } catch (error) {
      setError(error);
    }
  };

  const getPayments = async () => {
    try {
      setLoagind(true);
      const response = await getPaymentsApi();
      setLoagind(false);
      setPayments(response);
    } catch (error) {
      setLoagind(false);
      setError(error);
    }
  };

  return {
    error,
    loagind,
    payments,
    createPayment,
    getPaymentByTable,
    closePayment,
    getPayments,
  };
}
