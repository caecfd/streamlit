/**
 * @license
 * Copyright 2019 Streamlit Inc. All rights reserved.
 */

import React from 'react'
import { Checkbox as UICheckbox } from 'baseui/checkbox'
import { Map as ImmutableMap } from 'immutable'
import { WidgetStateManager } from 'lib/WidgetStateManager'
import { checkboxOverrides } from 'lib/widgetTheme'

interface Props {
  disabled: boolean;
  element: ImmutableMap<string, any>;
  widgetMgr: WidgetStateManager;
  width: number;
}

interface State {
  /**
   * The value specified by the user via the UI. If the user didn't touch this
   * widget's UI, it's undefined.
   */
  value?: boolean;
}

class Checkbox extends React.PureComponent<Props, State> {
  public state: State = {}

  /**
   * Return the user-entered value, or the widget's default value
   * if the user hasn't interacted with it yet.
   */
  private get valueOrDefault(): boolean {
    if (this.state.value === undefined) {
      return this.props.element.get('value') as boolean
    } else {
      return this.state.value
    }
  }

  private handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const widgetId = this.props.element.get('id')
    const value = (e.target as HTMLInputElement).checked

    this.setState({ value })
    this.props.widgetMgr.setBoolValue(widgetId, value)
  }

  public render(): React.ReactNode {
    const label = this.props.element.get('label')
    const style = { width: this.props.width }

    return (
      <div className="Widget row-widget stCheckbox" style={style}>
        <UICheckbox
          checked={this.valueOrDefault}
          onChange={this.handleChange}
          disabled={this.props.disabled}
          overrides={checkboxOverrides}
        >
          {label}
        </UICheckbox>
      </div>
    )
  }
}

export default Checkbox