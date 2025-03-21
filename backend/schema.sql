CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

CREATE TABLE IF NOT EXISTS tests (
  test_id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  test_name VARCHAR(255) NOT NULL,
  test_elements TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tests_user_id ON tests(user_id);

CREATE TRIGGER IF NOT EXISTS update_tests_updated_at
AFTER UPDATE ON tests
FOR EACH ROW
BEGIN
  UPDATE tests SET updated_at = CURRENT_TIMESTAMP WHERE test_id = NEW.test_id;
END;

CREATE TABLE IF NOT EXISTS reports (
  report_id INTEGER PRIMARY KEY,
  test_id INTEGER NOT NULL,
  execution_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT CHECK(status IN ('Passed', 'Failed', 'Skipped')) NOT NULL,
  metrics TEXT,
  FOREIGN KEY (test_id) REFERENCES tests(test_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_reports_test_id ON reports(test_id);

CREATE TABLE IF NOT EXISTS cicd_integrations (
  integration_id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  configuration TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cicd_integrations_user_id ON cicd_integrations(user_id);