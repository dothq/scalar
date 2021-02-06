import { useUserAgent } from '@oieduardorabelo/use-user-agent';
import axios from 'axios';
import React from 'react'
import { BUI } from '../../../components/BUI';
import { Button } from '../../../components/Button';
import { FeatureGrid } from '../../../components/FeatureGrid';

import { Layout } from '../../../components/Layout'

import '../../../styles/products/index.css'

const BrowserThanks = () => {
    React.useEffect(() => {
        if(typeof(window) === "undefined") return;

        window.addEventListener("DOMContentLoaded", () => {
            let os = "linux";

            const { platform } = window.navigator;
        
            if(platform.toLowerCase() === "win32") os = "windows";
            else if(platform.toLowerCase() === "macintel") os = "macos";

            axios.get(`/api/downloads?product=browser&os=${os}&noRedir=true`, { maxRedirects: 1 })
                .then(_ => {
                    const a = document.createElement("a");
                    a.href = _.data;
                    a.download = true.toString();
                    a.style.display = "none";

                    document.body.appendChild(a);

                    setTimeout(() => {
                        a.click();
                    }, 1000);
                }).catch(err => {
                    console.log(err);
                })
        })
    }, [])

    return (
        <Layout center fullHeight>
            <i className={"dot-browser-icon"} style={{ marginBottom: "18px" }} />
            <h1>Thanks for downloading!</h1>
            <p style={{ maxWidth: "516px", textAlign: "center" }}>
                Get ready to run the Dot Browser installer.<br/>
                Didn't work?
                <Button onClick={() => window.location.reload()} type={"text"} style={{ "--padding": "0px 4px", fontSize: "16px", color: "var(--text-primary)" }}>
                    Try downloading again.
                </Button>
            </p>
        </Layout>
    )
}

export default BrowserThanks
