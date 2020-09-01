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
    if (!workspace) {
        workspace = "0";
    }
    workspace = workspace.trim();
    let workspaceIndex = parseInt(workspace)

    let workspaces = (<div></div>);
    if (spaces !== undefined) {
       const spacesList = JSON.parse(spaces);
       workspaces = spacesList.map((spaceId) => {
         let spaceInt = parseInt(spaceId)
         let style = {
             "padding": "0.5em",
         };
         if (spaceInt === workspaceIndex) {
             style.color = "#bd93f9"
         }

         return (<span style={style}>{spaceId}</span>)
       })
    }
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
            const { workspace } = event;
            return {...previousState, workspace}
        case "display":
            const { display } = event;
            return {...previousState, display}
        case "spaces":
            const { spaces } = event;
            return {...previousState, spaces}
        default:
            return previousState;
    }
};
