-- CreateTable
CREATE TABLE "Tour" (
    "TourID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TourName" TEXT NOT NULL,
    "Description" TEXT,
    "Price" DECIMAL NOT NULL,
    "StartDate" DATETIME NOT NULL,
    "EndDate" DATETIME NOT NULL,
    "Location" TEXT
);

-- CreateTable
CREATE TABLE "Customer" (
    "CustomerID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT,
    "Address" TEXT
);

-- CreateTable
CREATE TABLE "Booking" (
    "BookingID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CustomerID" INTEGER NOT NULL,
    "TourID" INTEGER NOT NULL,
    "BookingDate" DATETIME NOT NULL,
    CONSTRAINT "Booking_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("CustomerID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_TourID_fkey" FOREIGN KEY ("TourID") REFERENCES "Tour" ("TourID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "PaymentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "BookingID" INTEGER NOT NULL,
    "PaymentDate" DATETIME NOT NULL,
    "Amount" DECIMAL NOT NULL,
    CONSTRAINT "Payment_BookingID_fkey" FOREIGN KEY ("BookingID") REFERENCES "Booking" ("BookingID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Feedback" (
    "FeedbackID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CustomerID" INTEGER NOT NULL,
    "TourID" INTEGER NOT NULL,
    "Rating" INTEGER,
    "Comment" TEXT,
    CONSTRAINT "Feedback_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("CustomerID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Feedback_TourID_fkey" FOREIGN KEY ("TourID") REFERENCES "Tour" ("TourID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CustomerSupport" (
    "SupportID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CustomerID" INTEGER NOT NULL,
    "SupportType" TEXT NOT NULL,
    "SupportDate" DATETIME NOT NULL,
    "Description" TEXT,
    CONSTRAINT "CustomerSupport_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("CustomerID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Promotion" (
    "PromotionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PromoCode" TEXT NOT NULL,
    "Description" TEXT,
    "Discount" DECIMAL,
    "StartDate" DATETIME NOT NULL,
    "EndDate" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Email_key" ON "Customer"("Email");

-- CreateIndex
CREATE INDEX "idx_customer_id" ON "Booking"("CustomerID");

-- CreateIndex
CREATE INDEX "idx_tour_id" ON "Booking"("TourID");
