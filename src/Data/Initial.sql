CREATE TABLE
    users (
        id CHAR(36) PRIMARY KEY,
        --
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    projects (
        id CHAR(36) PRIMARY KEY,
        -- 
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        is_public BOOLEAN DEFAULT TRUE,
        data JSON NOT NULL
    );

CREATE TABLE
    templates (
        id CHAR(36) PRIMARY KEY,
        -- 
        name VARCHAR(100) NOT NULL,
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data JSON NOT NULL
    );

CREATE TABLE
    projects (
        id CHAR(36) PRIMARY KEY,
        -- 
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        is_public BOOLEAN DEFAULT TRUE,
        data JSON NOT NULL
    );

CREATE TABLE
    project_users (
        PRIMARY KEY (userID, projectID),
        -- 
        role enum ('owner', 'editor', 'viewer') NOT NULL,
        --
        userID CHAR(36) NOT NULL,
        projectID CHAR(36) NOT NULL,
        --
        FOREIGN KEY (userID) references users (id),
        FOREIGN KEY (projectID) references projects (id)
    )