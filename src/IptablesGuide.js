// src/IptablesGuide.js

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'; // Import Bootstrap components
import './IptablesGuide.css'; // Optional: Custom CSS for additional styling

const IptablesGuide = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light guide-container">
      <Container>
        {/* Header */}
        <Row className="justify-content-center mb-4">
          <Col md={10} className="dabba">
            <h1 className="text-center text-primary">IPTABLES GUIDE</h1>
          </Col>
        </Row>

        {/* Installation Section */}
        <Row className="mb-4">
          <Col md={10} className="dabba">
            <Card>
              <Card.Body>
                <Card.Title>Installation</Card.Title>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
{`sudo apt-get install iptables iptables-persistent netfilter-persistent`}
                </SyntaxHighlighter>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Default Properties Section */}
        <Row className="mb-4">
          <Col md={10} className="dabba">
            <Card>
              <Card.Body>
                <Card.Title>Default Properties</Card.Title>
                <Card.Subtitle className="mb-2 text-success">Tables:</Card.Subtitle>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item"><strong>filter</strong>: The default table for filtering packets (allowing or blocking traffic).</li>
                  <li className="list-group-item"><strong>nat</strong>: Used for Network Address Translation (e.g., masquerading, port forwarding).</li>
                  <li className="list-group-item"><strong>mangle</strong>: Used for specialized packet alterations.</li>
                  <li className="list-group-item"><strong>raw</strong>: Used for configuring exemptions from connection tracking.</li>
                </ul>

                <Card.Subtitle className="mb-2 text-success">Chains:</Card.Subtitle>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>INPUT</strong>: For incoming packets destined for the local system.</li>
                  <li className="list-group-item"><strong>OUTPUT</strong>: For outgoing packets originating from the local system.</li>
                  <li className="list-group-item"><strong>FORWARD</strong>: For packets routed through the system (not destined for or originating from it).</li>
                  <li className="list-group-item"><strong>PREROUTING</strong>: Alters packets as they arrive, before routing.</li>
                  <li className="list-group-item"><strong>POSTROUTING</strong>: Alters packets as they leave, after routing.</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Rules Section */}
        <Row className="mb-4">
          <Col md={10} className="dabba">
            <Card>
              <Card.Body>
                <Card.Title>Rules</Card.Title>
                <p>Rules are the individual instructions that define how packets should be handled. They are evaluated in order within each chain.</p>
                
                <Card.Subtitle className="mb-2 text-success">List All Rules in All Tables</Card.Subtitle>
                <p>To view all rules across all tables, use:</p>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
{`sudo iptables -t <table_name> -L -v -n --line-numbers`}
                </SyntaxHighlighter>
                <ul>
                  <li><strong>-t</strong>: Table name (Default table is filter table)</li>
                  <li><strong>-L</strong>: List all rules</li>
                  <li><strong>-v</strong>: Verbose output</li>
                  <li><strong>-n</strong>: Numeric output of addresses and ports (prevents DNS lookups for speed).</li>
                  <li><strong>--line-numbers</strong>: Option for showing line numbers</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Writing Rules Section */}
        <Row className="mb-4">
          <Col md={10} className="dabba">
            <Card>
              <Card.Body>
                <Card.Title>Writing Rules to iptables:</Card.Title>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
{`sudo iptables -t [table] -A [chain] [options] -j [target]`}
                </SyntaxHighlighter>
                <ul>
                  <li><strong>-t [table]</strong>: Specifies the table (filter, nat, etc.).</li>
                  <li><strong>-A [chain]</strong>: Appends the rule to the specified chain (INPUT, OUTPUT, etc.).</li>
                  <li><strong>[options]</strong>: Criteria for matching packets (protocol, source, destination, ports, etc.).</li>
                  <li><strong>-j [target]</strong>: Action to take (ACCEPT, DROP, REJECT, SNAT, DNAT, etc.).</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Common Options Section */}
        <Row className="mb-4">
          <Col md={10} className="dabba">
            <Card>
              <Card.Body>
                <Card.Title>Common Options</Card.Title>
                <ul>
                  <li><strong>-p [protocol]</strong>: Protocol (tcp, udp, icmp, etc.).</li>
                  <li><strong>--dport [port]</strong>: Destination port.</li>
                  <li><strong>-s [source]</strong>: Source IP address.</li>
                  <li><strong>-d [destination]</strong>: Destination IP address.</li>
                  <li><strong>-i [interface]</strong>: Incoming network interface.</li>
                  <li><strong>-o [interface]</strong>: Outgoing network interface.</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Allow Incoming Connections for HTTP Section */}
        <Row className="mb-4">
          <Col md={10} className="dabba">
            <Card>
              <Card.Body>
                <Card.Title>Allow Incoming Connections for HTTP:</Card.Title>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
{`sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT`}
                </SyntaxHighlighter>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Block Connections to a Particular Website Section */}
        <Row className="mb-4">
          <Col md={10} className="dabba">
            <Card>
              <Card.Body>
                <Card.Title>Block Connections to a Particular Website:</Card.Title>
                <h5>For the Host Device Alone:</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
{`sudo iptables -A OUTPUT -d <ip> -j DROP`}
                </SyntaxHighlighter>

                <h5>For Devices Connected to the Host Device Where the Devices' Traffic Gets Routed Through the Host Device:</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
{`sudo iptables -I FORWARD 1 -s 103.102.166.224 -j DROP`}
                </SyntaxHighlighter>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Redirect Traffic to Different IP Section */}
        <Row className="mb-4">
          <Col md={10} className="dabba">
            <Card>
              <Card.Body>
                <Card.Title>Redirect Traffic to a Different IP:</Card.Title>
                <h5>For the Host Device Alone:</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
{`sudo iptables -t nat -A OUTPUT -p tcp -d 1.1.1.1 --dport 443 -j DNAT --to-destination 8.8.8.8:443`}
                </SyntaxHighlighter>

                <h5>For Devices Connected to the Host Device Where the Devices' Traffic Gets Routed Through the Host Device:</h5>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
{`sudo iptables -t nat -A PREROUTING -p tcp -d 1.1.1.1 --dport 443 -j DNAT --to-destination 8.8.8.8:443`}
                </SyntaxHighlighter>

                <p><strong>Note:</strong></p>
                <ul>
                  <li><strong>1.1.1.1</strong> =&gt; Actual destination IP</li>
                  <li><strong>8.8.8.8</strong> =&gt; IP that you want to redirect</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Save iptables Rules Section */}
        <Row className="mb-4">
          <Col md={10} className="dabba">
            <Card>
              <Card.Body>
                <Card.Title>Save iptables Rules</Card.Title>
                <p>To make sure your rules persist after reboot using <strong>iptables-persistent</strong>:</p>
                <ol>
                  <li><strong>Save the rules for persistence:</strong></li>
                  <SyntaxHighlighter language="bash" style={coy} className="mb-3">
{`sudo netfilter-persistent save`}
                  </SyntaxHighlighter>
                </ol>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Restart iptables Section */}
        <Row className="mb-4">
          <Col md={10} className="dabba">
            <Card>
              <Card.Body>
                <Card.Title>Restart iptables</Card.Title>
                <SyntaxHighlighter language="bash" style={coy} className="mb-3">
{`sudo systemctl restart netfilter-persistent (or)
sudo service netfilter-persistent restart`}
                </SyntaxHighlighter>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Summary Section */}
        <Row className="mb-4">
          <Col md={10} className="dabba">
            <Card>
              <Card.Body>
                <Card.Title>Summary</Card.Title>
                <p>This guide covers the installation, configuration, and management of <strong>iptables</strong> rules for various scenarios including allowing, blocking, and redirecting traffic. Additionally, it explains how to make these rules persistent across system reboots.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IptablesGuide;
