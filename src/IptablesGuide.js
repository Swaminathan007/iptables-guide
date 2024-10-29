// src/IptablesGuide.js

import React from 'react';
import './IptablesGuide.css'; // Custom styles
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy } from 'react-icons/fa'; // Importing copy icon from react-icons

const IptablesGuide = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const codeSnippets = [
    {
      code: `sudo apt-get install iptables iptables-persistent netfilter-persistent`,
      description: 'Install iptables and persistence packages'
    },
    {
      code: `sudo iptables -t <table_name> -L -v -n --line-numbers`,
      description: 'List all rules in all tables'
    },
    // Add other snippets as needed
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        {/* ... Navbar content ... */}
      </nav>

      {/* Main Content */}
      <div className="guide-container bg-light mt-5">
        <div className="container">
          {/* Header */}
          <div id="home" className="text-center my-5">
            <h1 className="display-4">IPTABLES GUIDE</h1>
            <p className="lead">Comprehensive guide to managing iptables on your system.</p>
          </div>

          {/* Installation Section */}
          <section id="installation">
            <h2 className="section-title">Installation</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Install iptables and Persistence Packages</h5>
                <div className="d-flex align-items-center">
                  <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                    {codeSnippets[0].code}
                  </SyntaxHighlighter>
                  <FaCopy className="copy-icon" onClick={() => copyToClipboard(codeSnippets[0].code)} />
                </div>
                <p className="card-text">
                  {codeSnippets[0].description}
                </p>
              </div>
            </div>
          </section>

          {/* Default Properties Section */}
          <section id="default-properties">
            <h2 className="section-title">Default Properties</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Tables</h5>
                {/* Add more code snippets similarly */}
              </div>
            </div>
          </section>

          {/* Continue with other sections and code snippets similarly */}
        </div>
      </div>
    </>
  );
};

export default IptablesGuide;
