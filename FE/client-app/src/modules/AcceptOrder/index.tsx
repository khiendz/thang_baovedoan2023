"use client";
import styles from "./styles.module.scss";
import { Formik, Field, ErrorMessage } from "formik";
import { useAppContext } from "hook/use-app-context";
import { Booking, Customer, Payment, Tour } from "Models";
import classNames from "classnames";
import { AddCustomer } from "services/customer";
import { AddBooking } from "services/bookings";
import { OrderParams } from "Models/OrderParams";
import { generateUID } from "utils/uid";
import { sendOrder } from "utils/crypto";
import { removeAccents } from "utils/charactor-util";
import { AddPayment } from "services/payment-service";

export default function AcceptOrder(props: any) {
  const { keyData, save } = props;
  const { data, setData } = useAppContext(keyData);
  const { data: tourType } = useAppContext("tour-type");
  const { data: tour, setData: setTour } = useAppContext(keyData);

  const handlePayment = async (tour: Tour) => {
    const customer = tour.Bookings[0].Customer;
    const paymentOrder = new OrderParams();
    paymentOrder.amount = tour.PriceTotal;
    paymentOrder.cancelUrl = window.location.href;
    paymentOrder.returnUrl = window.location.href;
    paymentOrder.description = `${removeAccents(customer.LastName)} payment`;
    const orderCode = generateUID();
    paymentOrder.orderCode = parseFloat(orderCode);
    const addPaymentResult = await handleAddPayment(orderCode,tour);
    if (addPaymentResult && addPaymentResult.status == 200) {
      const result = await sendOrder(paymentOrder);
      if (result && result.data.data) {
        window.location.href = result.data.data.checkoutUrl;
      }
    }
  }

  const handleAddPayment = async (orderCode: string, tour: Tour) => {
    const payment = new Payment();
    payment.Amount = tour.PriceTotal;
    payment.BookingID = tour?.Bookings[0]?.BookingID;
    payment.PaymentDate = new Date();
    payment.OrderCode = orderCode;
    const addPaymentResult = await AddPayment(payment);
    return addPaymentResult;
  }

  const handleAddBooking = async (customer: Customer, tour: Tour) => {
    if (!customer || !tour) 
      return;

    const booking = new Booking();
    booking.BookingDate = new Date();
    booking.TourID = tour.TourID;
    booking.CustomerID = customer.CustomerID;

    try {
      const result = await AddBooking(booking);
      if (result && result.status == 200) return result.data;
    } catch (e: any) {
      return null;
    }
  };

  const handleAddCustomer = async (values: any) => {
    const customer = {
      FirstName: values.firstName,
      LastName: values.lastName,
      Email: values.email,
      Phone: values.phone,
      Address: values.address,
      CustomerTypeId: 1,
    };

    try {
      const result = await AddCustomer(customer);
      if (result && result.status == 200) return result.data;
    } catch (e: any) {
      return null;
    }
  };

  const handleAddTour = async (values: any) => {
    let tourParam = { ...tour } as Tour;
    tourParam = {
      ...tourParam,
      Description: values.different,
      PriceTotal:
        tourParam.TotalElder * (tourType.PriceElder || 1) +
        tourParam.TotalChd * (tourType.PriceChildren || 1),
      TotalMember: tourParam.TotalElder + tourParam.TotalChd,
    };
    setTour(tourParam);

    try {
      const result = await save(tourParam);
      if (result && result.status == 200) return result.data;
    } catch (e: any) {
      return null;
    }
  };

  const handleSubmit = async (values: any) => {
    const customerResult = await handleAddCustomer(values);
    const tourResult = await handleAddTour(values);
    if (customerResult && tourResult) {
      const result = await handleAddBooking(customerResult, tourResult);
      if (result != null) {
        let tourParam = { ...tour } as Tour;
        tourParam = {
          ...tourParam,
          Description: values.different,
          PriceTotal:
            tourParam.TotalElder * (tourType.PriceElder || 1) +
            tourParam.TotalChd * (tourType.PriceChildren || 1),
          TotalMember: tourParam.TotalElder + tourParam.TotalChd,
          Bookings: [result]
        };
        handlePayment(tourParam);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.content} dk-flex dk-items-center dk-justify-center`}
      >
        <div className="dk-bg-white dk-w-[440px] dk-p-4 dk-rounded-md dk-relative dk-z-10">
          <p className="dk-font-Inter dk-text-[#329ebe] dk-text-2xl dk-font-bold">
            Yêu cầu đặt
          </p>
          <p className="dk-text-sm dk-font-Merriweather dk-text-gray-400">
            Quý khách vui lòng nhập thông tin liên hệ bên dưới
          </p>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              phone: "",
              email: "",
              address: "",
              different: "",
            }}
            enableReinitialize={true}
            validate={(values) => {
              const errors: any = {};
              if (!values.email) {
                errors.email = "Vui lòng nhập email";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Email không hợp lệ";
              }

              if (!values.firstName) {
                errors.firstName = "Vui lòng nhập tên";
              }

              if (!values.lastName) {
                errors.lastName = "Vui lòng nhập tên";
              }

              if (!values.address) {
                errors.address = "Vui lòng nhập địa chỉ";
              }

              if (!values.phone) {
                errors.phone = "Vui lòng nhập số điện thoại";
              } else if (
                !/^(84|0[3|5|7|8|9])+([0-9]{8})$/g.test(values.phone)
              ) {
                errors.phone = "Số điện thoại không hợp lệ";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              handleSubmit(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={classNames(styles.fieldContainer)}>
                  <Field
                    className={classNames(styles.field, {
                      [styles.success]: !errors.firstName && touched.firstName,
                    })}
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Nhập first name"
                    onChange={(e: any) => {
                      setFieldValue("firstName", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className={styles.error}
                    name="firstName"
                    component="div"
                  />
                </div>
                <div className={classNames(styles.fieldContainer)}>
                  <Field
                    className={classNames(styles.field, {
                      [styles.success]: !errors.lastName && touched.lastName,
                    })}
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Nhập last name"
                    onChange={(e: any) => {
                      setFieldValue("lastName", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className={styles.error}
                    name="lastName"
                    component="div"
                  />
                </div>
                <div className={classNames(styles.fieldContainer)}>
                  <Field
                    className={classNames(styles.field, {
                      [styles.success]: !errors.address && touched.address,
                    })}
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Nhập đại chỉ"
                    onChange={(e: any) => {
                      setFieldValue("address", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className={styles.error}
                    name="address"
                    component="div"
                  />
                </div>
                <div className={classNames(styles.fieldContainer)}>
                  <Field
                    className={classNames(styles.field, {
                      [styles.success]: !errors.phone && touched.phone,
                    })}
                    type="phone"
                    id="phone"
                    name="phone"
                    placeholder="Số điện thoại"
                    onChange={(e: any) => {
                      setFieldValue("phone", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className={styles.error}
                    name="phone"
                    component="div"
                  />
                </div>
                <div className={classNames(styles.fieldContainer)}>
                  <Field
                    className={classNames(styles.field, {
                      [styles.success]: !errors.email && touched.email,
                    })}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Địa chỉ email"
                    onChange={(e: any) => {
                      setFieldValue("email", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className={styles.error}
                    name="email"
                    component="div"
                  />
                </div>
                <div className={classNames(styles.fieldContainer)}>
                  <Field
                    className={classNames(styles.field, {
                      [styles.success]: !errors.different && touched.different,
                    })}
                    type="text"
                    id="different"
                    name="different"
                    placeholder="Khác"
                    onChange={(e: any) => {
                      setFieldValue("different", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className={styles.error}
                    name="different"
                    component="div"
                  />
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.cancel}
                    type="button"
                    onClick={() => {
                      props.setOrder(false);
                    }}
                  >
                    Hủy
                  </button>
                  <button className={styles.submit} type="submit">
                    Đặt tour
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
