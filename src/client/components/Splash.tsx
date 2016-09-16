import * as React from "react";

export class Splash extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1>Splash View</h1>
                <div style={{
                    backgroundImage: "url(/images/splash.png)",
                    backgroundPosition: "center center",
                    width: "100%",
                    height: 600
                }} 
                 >
                </div>
            </div>
        )
    }
}