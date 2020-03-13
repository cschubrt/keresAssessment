<MyPicker
              placeholder={{ label: 'Make Selection', value: null, color: 'grey', }}
              onValueChange={value => { this.setState({ agency_id: value }) }}
              value={this.state.agency_id}
              items={agnt}
            />