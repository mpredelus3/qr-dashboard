USE QRDatabase;

-- Create the QRCodes table to store information about each QR code
CREATE TABLE dbo.QRCodes (
    QRId NVARCHAR(100) PRIMARY KEY,
    RedirectURL NVARCHAR(2048) NOT NULL,
    SquareColor NVARCHAR(7) NOT NULL,
    EyeColor NVARCHAR(7) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Create the QRScans table to log each time a QR code is scanned
CREATE TABLE dbo.QRScans (
    LogId INT PRIMARY KEY IDENTITY(1,1),
    QRId NVARCHAR(100) NOT NULL,
    ScanDateTime DATETIME DEFAULT GETDATE(),
    DeviceInfo NVARCHAR(512),
    Country NVARCHAR(100),
    City NVARCHAR(100),
    ScannerIdentifier NVARCHAR(100),
    FOREIGN KEY (QRId) REFERENCES dbo.QRCodes(QRId)
);
