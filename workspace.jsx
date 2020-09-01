import { run } from 'uebersicht'

const ws ="bash pecan/scripts/ws";
const spaces ="bash pecan/scripts/spaces";
const display ="bash pecan/scripts/display";
export const refreshFrequency = 500; // ms

export const command = dispatch => {
    run(ws).then(workspace => dispatch({ type: "workspace", workspace }))
    run(display).then(display => dispatch({ type: "display", display }))
    run(spaces).then(spaces => dispatch({ type: "spaces", spaces }))
}

export const render = ({ workspace, spaces, display }) => {
    let workspaces = spaces.map((space) => {
      let style = {
          "padding": "0.5em",
      };
      if (space === workspace) {
          style.color = "#bd93f9"
      }
      return (<span style={style}>{space}</span>)
    })
    return (<div class='screen'>
        <div class='pecanworkspace'>
            <span>D: { display } </span>
            <span>W: { workspaces }</span>
        </div>
    </div>);
}

export const updateState = (event, previousState) => {
    switch (event.type) {
        case "workspace":
            let { workspace } = event;
            if (!workspace) {
                workspace = "0";
            }
            workspace = workspace.trim();
            workspace = parseInt(workspace);
            return {...previousState, workspace}
        case "display":
            const { display } = event;
            return {...previousState, display}
        case "spaces":
            let { spaces } = event;
            if (!spaces) {
              spaces = [];
            } else {
              spaces = JSON.parse(spaces);
              spaces = spaces.map(space => parseInt(space))
            }
            return {...previousState, spaces}
        default:
            return previousState;
    }
};
