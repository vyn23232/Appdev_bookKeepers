import React, { useState } from 'react';
import Books from './components/Books';
import Categories from './components/Categories';

function App() {
    const [refreshCount, setRefreshCount] = useState(0);

    const handleCategoryAdded = () => {
        setRefreshCount((count) => count + 1); // Trigger refresh by incrementing
    };

    return (
        <div className="App">
            <Books refreshCount={refreshCount} />
            <Categories onCategoryAdded={handleCategoryAdded} />
        </div>
    );
}

export default App;

// put this bellow the "App" <h1><i className="fas fa-book"></i> Book Keepers</h1>