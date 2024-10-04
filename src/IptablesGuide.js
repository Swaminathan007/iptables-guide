// src/IptablesGuide.js

import React from 'react';
import './IptablesGuide.css'; // Custom styles
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

const IptablesGuide = () => {
  return (
  <>
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

      <div className="guide-container bg-light mt-5">
        <div className="container">
          <div id="home" className="text-center my-5">
            <h1 className="display-4">IPTABLES GUIDE</h1>
            <p className="lead">Comprehensive guide to managing iptables on your system.</p>
          </div>

          <section id="installation">
            <h2 className="section-title">Installation</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Install iptables and Persistence Packages</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                  {`sudo apt-get install iptables iptables-persistent netfilter-persistent`}
                </SyntaxHighlighter>
                <p className="card-text">
                  This command installs iptables along with packages to make rules persistent across reboots.
                </p>
              </div>
            </div>
          </section>

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
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                  {`sudo iptables -t <table_name> -L -v -n --line-numbers`}
                </SyntaxHighlighter>
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

          <section id="writing-rules">
            <h2 className="section-title">Writing Rules to iptables</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Basic Syntax</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                  {`sudo iptables -t [table] -A [chain] [options] -j [target]`}
                </SyntaxHighlighter>
                <ul>
                  <li>
                    <strong>-t [table]</strong>: Specifies the table (filter, nat, etc.).
                  </li>
                  <li>
                    <strong>-A [chain]</strong>: Appends the rule to the specified chain (INPUT, OUTPUT, etc.).
                  </li>
                  <li>
                    <strong>[options]</strong>: Criteria for matching packets (protocol, source, destination, ports, etc.).
                  </li>
                  <li>
                    <strong>-j [target]</strong>: Action to take (ACCEPT, DROP, REJECT, SNAT, DNAT, etc.).
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="common-options">
            <h2 className="section-title">Common Options</h2>
            <div className="card mb-4">
              <div className="card-body">
                <ul>
                  <li>
                    <strong>-p [protocol]</strong>: Protocol (tcp, udp, icmp, etc.).
                  </li>
                  <li>
                    <strong>--dport [port]</strong>: Destination port.
                  </li>
                  <li>
                    <strong>-s [source]</strong>: Source IP address.
                  </li>
                  <li>
                    <strong>-d [destination]</strong>: Destination IP address.
                  </li>
                  <li>
                    <strong>-i [interface]</strong>: Incoming network interface.
                  </li>
                  <li>
                    <strong>-o [interface]</strong>: Outgoing network interface.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="allow-http">
            <h2 className="section-title">Allow Incoming Connections for HTTP</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Allow HTTP Traffic</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                  {`sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT`}
                </SyntaxHighlighter>
                <p className="card-text">This rule allows incoming HTTP traffic on port 80.</p>
              </div>
            </div>
          </section>

          <section id="block-connections">
            <h2 className="section-title">Block Connections to a Particular Website</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">For the Host Device Alone:</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                  {`sudo iptables -A OUTPUT -d <ip> -j DROP`}
                </SyntaxHighlighter>
                <p className="card-text">This rule blocks outgoing connections from the host device to the specified IP.</p>

                <h5 className="card-title">For Devices Connected to the Host Device (Traffic Routed Through Host):</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                  {`sudo iptables -I FORWARD 1 -s 103.102.166.224 -j DROP`}
                </SyntaxHighlighter>
                <p className="card-text">This rule blocks forwarded traffic from the specified source IP through the host device.</p>
              </div>
            </div>
          </section>

          <section id="redirect-traffic">
            <h2 className="section-title">Redirect Traffic to a Different IP</h2>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">For the Host Device Alone:</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                  {`Allow redirection:
                    sudo nano /etc/sysctl.conf
                    Add the following:
                    	net.ipv4.ip_forward = 1
                    Save and exit
                    sudo sysctl -p
                    `}
                </SyntaxHighlighter>
            </div>
            
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">For the Host Device Alone:</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                  {`sudo iptables -t nat -A OUTPUT -p tcp -d 1.1.1.1 --dport 443 -j DNAT --to-destination 8.8.8.8:443`}
                </SyntaxHighlighter>
                <p className="card-text">
                  This rule redirects outgoing HTTPS traffic from the host device destined for <code>1.1.1.1:443</code> to <code>8.8.8.8:443</code>.
                </p>

                <h5 className="card-title">For Devices Connected to the Host Device (Traffic Routed Through Host):</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                  {`sudo iptables -t nat -A PREROUTING -p tcp -d 1.1.1.1 --dport 443 -j DNAT --to-destination 8.8.8.8:443`}
                </SyntaxHighlighter>
                <p className="card-text">
                  This rule redirects forwarded HTTPS traffic destined for <code>1.1.1.1:443</code> to <code>8.8.8.8:443</code> through the host device.
                </p>

                <p><strong>Note:</strong></p>
                <ul>
                  <li><strong>1.1.1.1</strong> =&gt; Actual destination IP</li>
                  <li><strong>8.8.8.8</strong> =&gt; IP that you want to redirect</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="save-rules">
            <h2 className="section-title">Save iptables Rules</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Persist Rules Across Reboots</h5>
                <p>
                  To ensure your iptables rules persist after a system reboot, use the <code>iptables-persistent</code> package.
                </p>
                <h6>Using <code>iptables-persistent</code>:</h6>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                  {`sudo netfilter-persistent save`}
                </SyntaxHighlighter>
                <p>This command saves the current iptables rules to be automatically reloaded on reboot.</p>
              </div>
            </div>
          </section>

          <section id="restart-iptables">
            <h2 className="section-title">Restart iptables</h2>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Restarting iptables Services</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                  {`sudo systemctl restart netfilter-persistent`}
                </SyntaxHighlighter>
                <p>or</p>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
                  {`sudo service netfilter-persistent restart`}
                </SyntaxHighlighter>
                <p>
                  These commands restart the <code>netfilter-persistent</code> service to apply any changes made to iptables rules.
                </p>
              </div>
            </div>
          </section>
          <section id="summary">
            <h2 className="section-title">Summary</h2>
            <div className="card mb-4">
              <div className="card-body">
                <p>
                  This guide covers the installation, configuration, and management of <strong>iptables</strong> rules for various scenarios including allowing, blocking, and redirecting traffic. Additionally, it explains how to make these rules persistent across system reboots.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default IptablesGuide;
