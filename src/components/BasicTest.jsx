export const BasicTest = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1a237e' }}>Zuba Broadband Dashboard</h1>
      <p>This is a basic test to ensure React is working.</p>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h2>Features:</h2>
        <ul>
          <li>Client data usage tracking</li>
          <li>Monthly usage reports</li>
          <li>Advanced filtering</li>
          <li>Data visualization</li>
        </ul>
      </div>
      <button 
        style={{
          backgroundColor: '#1a237e',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          marginTop: '20px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Button clicked!')}
      >
        Test Button
      </button>
    </div>
  )
}

