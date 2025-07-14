# Pixgo Architecture

## Project Structure

```
src/
├── commands/           # CLI command implementations
│   ├── config.js       # Configuration management commands
│   ├── delete.js       # Image deletion command
│   ├── history.js      # Image history command
│   ├── upload.js       # Image upload command
│   └── index.js        # Command exports
├── services/           # Business logic services
│   ├── cloudinary.js   # Cloudinary API integration
│   ├── config.js       # Configuration service
│   ├── database.js     # Local database operations
│   └── index.js        # Service exports
├── utils/              # Utility functions
│   ├── error.js        # Error handling utilities
│   ├── spinner.js      # Loading spinner utilities
│   ├── validation.js   # File validation utilities
│   └── index.js        # Utility exports
└── main.js             # CLI entry point
```

## Design Principles

### 1. Separation of Concerns
- **Commands**: Handle CLI interface and user interaction
- **Services**: Contain business logic and external API integration
- **Utils**: Provide reusable utility functions

### 2. Modular Architecture
- Each module has a single responsibility
- Clear interfaces between modules
- Easy to test and maintain

### 3. Error Handling
- Centralized error handling in utils/error.js
- Consistent error messages across the application
- Graceful error recovery where possible

### 4. Configuration Management
- Secure configuration storage
- Validation of required configuration values
- Easy setup process for new users

## Key Improvements

1. **Better Organization**: Clear separation between commands, services, and utilities
2. **Class-based Services**: More maintainable and testable code structure
3. **Modular Utilities**: Reusable functions organized by purpose
4. **Improved Error Handling**: Better error messages and handling
5. **Cleaner CLI Interface**: More intuitive command structure

## Usage Patterns

### Adding New Commands
1. Create command file in `src/commands/`
2. Export command function
3. Add export to `src/commands/index.js`
4. Register command in `src/main.js`

### Adding New Services
1. Create service class in `src/services/`
2. Use static methods for stateless operations
3. Add export to `src/services/index.js`
4. Import and use in commands

### Adding New Utilities
1. Create utility file in `src/utils/`
2. Export functions
3. Add export to `src/utils/index.js`
4. Import where needed