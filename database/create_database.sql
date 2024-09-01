-- Create Database
CREATE DATABASE QRDashboard;

USE QRDashboard;

-- Table to store QR Codes
CREATE TABLE QRCodes (
    Id INT PRIMARY KEY IDENTITY(1,1),
    QRId NVARCHAR(100) UNIQUE NOT NULL,
    RedirectURL NVARCHAR(2048) NOT NULL,
    SquareColor NVARCHAR(7) NOT NULL, -- e.g., #FFFFFF
    EyeColor NVARCHAR(7) NOT NULL,    -- e.g., #000000
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Table to log scans
CREATE TABLE QRScanLogs (
    LogId INT PRIMARY KEY IDENTITY(1,1),
    QRId NVARCHAR(100) NOT NULL,
    ScanDateTime DATETIME DEFAULT GETDATE(),
    DeviceInfo NVARCHAR(512),
    Country NVARCHAR(100),
    City NVARCHAR(100),
    ScannerIdentifier NVARCHAR(100),
    FOREIGN KEY (QRId) REFERENCES QRCodes(QRId)
);
