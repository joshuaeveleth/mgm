import * as React from "react";

import { Modal, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

interface props {
  submit: (password: string) => void,
  cancel: () => void
}

export class SetPasswordModal extends React.Component<props, {}> {
  state: {
    p1: string
    p2: string
    err: string
  }

  constructor(props: props) {
    super(props);
    this.state = {
      p1: '',
      p2: '',
      err: ''
    }
  }

  handleSubmit() {
    this.props.submit('slazen');
  }

  onP1() {

  }

  onP2() {

  }

  render() {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Set Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ControlLabel>Password: </ControlLabel>
          <FormControl type="password" placeholder="" onChange={this.onP1.bind(this) }/>
          <ControlLabel>Repeat: </ControlLabel>
          <FormControl type="password" placeholder="" onChange={this.onP2.bind(this) }/>
        </Modal.Body>

        <Modal.Footer>
          {this.state.err}
          <Button onClick={this.handleSubmit.bind(this) }>Submit</Button>
          <Button onClick={this.props.cancel}>Cancel</Button>
        </Modal.Footer>
      </Modal.Dialog>
    )
  }
}