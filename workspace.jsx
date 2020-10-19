import { run } from 'uebersicht'

const ws = "bash pecan/scripts/ws";
const spaces = "bash pecan/scripts/spaces";
const display = "bash pecan/scripts/display";
const layout = "bash pecan/scripts/layout";
export const refreshFrequency = 10000; // ms

export const command = dispatch => {
    run(ws).then(workspace => dispatch({ type: "workspace", workspace }))
    run(display).then(display => dispatch({ type: "display", display }))
    run(spaces).then(spaces => dispatch({ type: "spaces", spaces }))
    run(layout).then(layout => dispatch({ type: "layout", layout }))
}

export const render = ({ workspace, spaces, display, layout }) => {
    let workspaces = spaces.map((space) => {
      let style = {
          "padding": "0.5em",
          "color": "#4C566A",
          // "color": "#3B4252",
      };
      if (space === workspace) {
          style.color = "#81A1C1"
      }
      return (<span key={space} style={style}>{space}</span>)
    })

    let selectedColor = {color: "#81A1C1"};
    let dashColor = {color: "#4C566A"};

    return (<div className='screen'>
        <div className='pecanworkspace'>
            <span style={selectedColor}>{ layout } </span>
            <span style={dashColor}>-</span>
            <span style={selectedColor}>{ display }</span>
            <span style={dashColor}>-</span>
            <span>{ workspaces }</span>
        </div>
    </div>);
}

export const initialState = {
  workspace: 0,
  spaces:    [0],
  display:   0,
  layout:    "bsp"
}

export const updateState = (event, previousState) => {
  switch (event.type) {
    case "workspace":
      let { workspace } = event;
      workspace = workspace.trim();
      workspace = parseInt(workspace);
      return {...previousState, workspace}
    case "layout":
      let { layout } = event;
      layout = layout.trim();
      return {...previousState, layout}
    case "display":
      const { display } = event;
      return {...previousState, display}
    case "spaces":
      let { spaces } = event;
      if (!spaces) {
        spaces = [0];
      } else {
        spaces = JSON.parse(spaces);
        spaces = spaces.map(space => parseInt(space))
      }
      return {...previousState, spaces}
    default:
      return previousState;
  }
};
