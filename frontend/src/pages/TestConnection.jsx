import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Card from '../components/Card'
import { CheckCircle, XCircle, Loader } from 'lucide-react'

export default function TestConnection() {
  const [results, setResults] = useState(null)
  const [testing, setTesting] = useState(false)

  const runTests = async () => {
    setTesting(true)
    const testResults = {}

    // Test 1: Supabase client initialized
    testResults.clientInit = !!supabase

    // Test 2: Can connect to database
    try {
      const { data, error } = await supabase.from('profiles').select('count')
      testResults.dbConnection = !error
      testResults.dbError = error?.message
    } catch (e) {
      testResults.dbConnection = false
      testResults.dbError = e.message
    }

    // Test 3: Can access auth
    try {
      const { data, error } = await supabase.auth.getSession()
      testResults.authConnection = !error
      testResults.authError = error?.message
    } catch (e) {
      testResults.authConnection = false
      testResults.authError = e.message
    }

    // Test 4: Check environment variables
    testResults.hasUrl = !!import.meta.env.VITE_SUPABASE_URL
    testResults.hasKey = !!import.meta.env.VITE_SUPABASE_ANON_KEY
    testResults.url = import.meta.env.VITE_SUPABASE_URL
    testResults.keyPreview = import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...'

    setResults(testResults)
    setTesting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Database Connection Test</h1>

        <Card className="p-8 mb-6">
          <button
            onClick={runTests}
            disabled={testing}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {testing ? (
              <span className="flex items-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                Testing...
              </span>
            ) : (
              'Run Connection Tests'
            )}
          </button>
        </Card>

        {results && (
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Test Results</h2>
              
              <div className="space-y-3">
                <TestResult
                  label="Supabase Client Initialized"
                  passed={results.clientInit}
                />
                
                <TestResult
                  label="Environment Variables Set"
                  passed={results.hasUrl && results.hasKey}
                  details={
                    <div className="text-xs mt-2 space-y-1">
                      <div>URL: {results.url || '❌ Not set'}</div>
                      <div>Key: {results.keyPreview || '❌ Not set'}</div>
                    </div>
                  }
                />
                
                <TestResult
                  label="Database Connection"
                  passed={results.dbConnection}
                  error={results.dbError}
                />
                
                <TestResult
                  label="Auth Service Connection"
                  passed={results.authConnection}
                  error={results.authError}
                />
              </div>
            </Card>

            {!results.dbConnection && (
              <Card className="p-6 bg-red-50 border-2 border-red-200">
                <h3 className="text-lg font-bold text-red-800 mb-3">❌ Database Not Connected</h3>
                <div className="text-sm text-red-700 space-y-2">
                  <p><strong>Possible Issues:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Check .env file exists in frontend folder</li>
                    <li>Verify VITE_SUPABASE_URL is correct</li>
                    <li>Verify VITE_SUPABASE_ANON_KEY is correct</li>
                    <li>Restart dev server after changing .env</li>
                    <li>Check Supabase project is active</li>
                  </ul>
                  <p className="mt-3"><strong>Error:</strong> {results.dbError}</p>
                </div>
              </Card>
            )}

            {results.dbConnection && (
              <Card className="p-6 bg-green-50 border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-800 mb-2">✅ Database Connected Successfully!</h3>
                <p className="text-sm text-green-700">
                  Your application is properly connected to Supabase. The registration error is likely due to:
                </p>
                <ul className="list-disc list-inside text-sm text-green-700 mt-2 space-y-1">
                  <li>Email confirmation enabled (disable in Auth settings)</li>
                  <li>Database trigger error (run the fix SQL script)</li>
                  <li>Missing username column (run migration)</li>
                </ul>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function TestResult({ label, passed, error, details }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      {passed ? (
        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
      ) : (
        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1">
        <div className="font-semibold text-gray-800">{label}</div>
        {error && <div className="text-sm text-red-600 mt-1">Error: {error}</div>}
        {details && <div className="text-gray-600 mt-1">{details}</div>}
      </div>
    </div>
  )
}
