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

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#home">
            IPTABLES Guide
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#installation">
                  Installation
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#default-properties">
                  Default Properties
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#rules">
                  Rules
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#common-options">
                  Common Options
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#allow-http">
                  Allow HTTP
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#block-connections">
                  Block Connections
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#redirect-traffic">
                  Redirect Traffic
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#save-rules">
                  Save Rules
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#restart-iptables">
                  Restart IPTABLES
                </a>
              </li>
            </ul>
          </div>
        </div>
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
                    {`sudo apt-get install iptables iptables-persistent netfilter-persistent`}
                  </SyntaxHighlighter>
                  <FaCopy className="copy-icon" onClick={() => copyToClipboard('sudo apt-get install iptables iptables-persistent netfilter-persistent')} />
                </div>
                <p className="card-text">
                  This command installs iptables along with packages to make rules persistent across reboots.
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
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">
                    <strong>filter</strong>: The default table for filtering packets (allowing or blocking traffic).
                  </li>
                  <li className="list-group-item">
                    <strong>nat</strong>: Used for Network Address Translation (e.g., masquerading, port forwarding).
                  </li>
                  <li className="list-group-item">
                    <strong>mangle</strong>: Used for specialized packet alterations.
                  </li>
                  <li className="list-group-item">
                    <strong>raw</strong>: Used for configuring exemptions from connection tracking.
                  </li>
                </ul>

                <h5 className="card-title">Chains</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>INPUT</strong>: For incoming packets destined for the local system.
                  </li>
                  <li className="list-group-item">
                    <strong>OUTPUT</strong>: For outgoing packets originating from the local system.
                  </li>
                  <li className="list-group-item">
                    <strong>FORWARD</strong>: For packets routed through the system (not destined for or originating from it).
                  </li>
                  <li className="list-group-item">
                    <strong>PREROUTING</strong>: Alters packets as they arrive, before routing.
                  </li>
                  <li className="list-group-item">
                    <strong>POSTROUTING</strong>: Alters packets as they leave, after routing.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Rules Section */}
          <section id="rules">
            <h2 className="section-title">Rules</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Understanding Rules</h5>
                <p className="card-text">
                  Rules are the individual instructions that define how packets should be handled. They are evaluated in order within each chain.
                </p>

                <h5 className="card-title">List All Rules in All Tables</h5>
                <p className="card-text">To view all rules across all tables, use:</p>
                <div className="d-flex align-items-center">
                  <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                    {`sudo iptables -t <table_name> -L -v -n --line-numbers`}
                  </SyntaxHighlighter>
                  <FaCopy className="copy-icon" onClick={() => copyToClipboard('sudo iptables -t <table_name> -L -v -n --line-numbers')} />
                </div>
                <ul>
                  <li>
                    <strong>-t</strong>: Table name (Default table is filter table)
                  </li>
                  <li>
                    <strong>-L</strong>: List all rules
                  </li>
                  <li>
                    <strong>-v</strong>: Verbose output
                  </li>
                  <li>
                    <strong>-n</strong>: Numeric output of addresses and ports (prevents DNS lookups for speed).
                  </li>
                  <li>
                    <strong>--line-numbers</strong>: Option for showing line numbers
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Writing Rules Section */}
          <section id="writing-rules">
            <h2 className="section-title">Writing Rules to iptables</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Basic Syntax</h5>
                <div className="d-flex align-items-center">
                  <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                    {`sudo iptables -t [table] -A [chain] [options] -j [target]`}
                  </SyntaxHighlighter>
                  <FaCopy className="copy-icon" onClick={() => copyToClipboard('sudo iptables -t [table] -A [chain] [options] -j [target]')} />
                </div>
                <ul>
                  <li>
                    <strong>-t [table]</strong>: Specifies the table (filter, nat, etc.).
                  </li>
                  <li>
                    <strong>-A [chain]</strong>: Appends the rule to the specified chain (INPUT, OUTPUT, etc.).
                  </li>
                  <li>
                    <strong>[options]</strong>: Criteria for matching packets (protocol, source/destination IP, etc.).
                  </li>
                  <li>
                    <strong>-j [target]</strong>: Specifies the action to take (ACCEPT, DROP, REJECT, etc.).
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Allow HTTP Section */}
          <section id="allow-http">
            <h2 className="section-title">Allow HTTP Traffic</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Command to Allow HTTP</h5>
                <div className="d-flex align-items-center">
                  <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                    {`sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT`}
                  </SyntaxHighlighter>
                  <FaCopy className="copy-icon" onClick={() => copyToClipboard('sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT')} />
                </div>
                <p className="card-text">
                  This command allows incoming TCP traffic on port 80, which is used for HTTP.
                </p>
              </div>
            </div>
          </section>

          {/* Block Connections Section */}
          <section id="block-connections">
            <h2 className="section-title">Block All Incoming Connections</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Command to Block All Incoming Traffic</h5>
                <div className="d-flex align-items-center">
                  <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                    {`sudo iptables -A INPUT -j DROP`}
                  </SyntaxHighlighter>
                  <FaCopy className="copy-icon" onClick={() => copyToClipboard('sudo iptables -A INPUT -j DROP')} />
                </div>
                <p className="card-text">
                  This command blocks all incoming traffic. Use with caution!
                </p>
              </div>
            </div>
          </section>

          {/* Redirect Traffic Section */}
          <section id="redirect-traffic">
            <h2 className="section-title">Redirect Traffic</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Command to Redirect HTTP to HTTPS</h5>
                <div className="d-flex align-items-center">
                  <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                    {`sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 443`}
                  </SyntaxHighlighter>
                  <FaCopy className="copy-icon" onClick={() => copyToClipboard('sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 443')} />
                </div>
                <p className="card-text">
                  This command redirects incoming HTTP traffic (port 80) to HTTPS (port 443).
                </p>
              </div>
            </div>
          </section>

          {/* Save Rules Section */}
          <section id="save-rules">
            <h2 className="section-title">Save iptables Rules</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Command to Save Rules</h5>
                <div className="d-flex align-items-center">
                  <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                    {`sudo iptables-save > /etc/iptables/rules.v4`}
                  </SyntaxHighlighter>
                  <FaCopy className="copy-icon" onClick={() => copyToClipboard('sudo iptables-save > /etc/iptables/rules.v4')} />
                </div>
                <p className="card-text">
                  This command saves the current iptables rules to the specified file for persistence.
                </p>
              </div>
            </div>
          </section>

          {/* Restart IPTABLES Section */}
          <section id="restart-iptables">
            <h2 className="section-title">Restart IPTABLES</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Command to Restart IPTABLES</h5>
                <div className="d-flex align-items-center">
                  <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                    {`sudo systemctl restart netfilter-persistent`}
                  </SyntaxHighlighter>
                  <FaCopy className="copy-icon" onClick={() => copyToClipboard('sudo systemctl restart netfilter-persistent')} />
                </div>
                <p className="card-text">
                  This command restarts the netfilter service, applying the saved rules.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <div className="text-center my-5">
            <h2>Conclusion</h2>
            <p>
              This guide provides an overview of managing iptables. For more advanced configurations and rules, refer to the official documentation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IptablesGuide;
