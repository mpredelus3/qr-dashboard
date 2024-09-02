-- Ensure you're using the correct database
USE QRDatabase;

-- Create the QRCodes table to store information about each QR code
CREATE TABLE dbo.QRCodes (
    QRId NVARCHAR(100) PRIMARY KEY,          -- Unique identifier for each QR code
    RedirectURL NVARCHAR(2048) NOT NULL,     -- URL to redirect when the QR code is scanned
    SquareColor NVARCHAR(7) NOT NULL,        -- Color of the squares in the QR code (e.g., #000000 for black)
    EyeColor NVARCHAR(7) NOT NULL,           -- Color of the eyes in the QR code (e.g., #FFFFFF for white)
    CreatedAt DATETIME DEFAULT GETDATE()     -- Timestamp when the QR code was created
);

-- Create the QRScans table to log each time a QR code is scanned
CREATE TABLE dbo.QRScans (
    LogId INT PRIMARY KEY IDENTITY(1,1),     -- Unique identifier for each scan log entry
    QRId NVARCHAR(100) NOT NULL,             -- Reference to the QRId in the QRCodes table
    ScanDateTime DATETIME DEFAULT GETDATE(), -- Timestamp when the QR code was scanned
    DeviceInfo NVARCHAR(512),                -- Information about the scanning device (e.g., user agent string)
    Country NVARCHAR(100),                   -- Country where the scan occurred
    City NVARCHAR(100),                      -- City where the scan occurred
    ScannerIdentifier NVARCHAR(100),         -- Identifier for the scanner (e.g., IP address and user agent)
    FOREIGN KEY (QRId) REFERENCES dbo.QRCodes(QRId) -- Foreign key to the QRCodes table
);
