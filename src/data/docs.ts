
export interface Docs {
    name: string;
    slug: string;
    details: DocsDetails;
}

interface DocsBody {
    title: string;
    dataType: 'string' | 'number' | 'boolean';
    required: boolean;
    desc: string;
}

interface DocsBodyWithChild extends DocsBody {
    children?: DocsBody[]
}

export interface DocsDetails {
    desc: string;
    method: 'POST' | 'GET';
    path: string;
    headers?: {
        title: string;
        value: string;
    }[];
    body?: DocsBodyWithChild[],
    sample?: {
        platform : string;
        code: string;
    }[]
}


export default (
    [
        {
            name: "Post Data",
            slug: "post-data",
            details: {
                desc: "Create or Update data for Groups, Bots, Status, and Notification",
                method: "POST",
                path: "/private/v1/data",
                headers: [
                    {
                        title: "Content-Type",
                        value: "application/json"
                    }
                ],
                body: [
                    {
                        title: "groupName",
                        dataType: "string",
                        required: true,
                        desc: "The name of the group, for example “RDP AWS”. This name can be used again to update existing data with same form."
                    },
                    {
                        title: "ip",
                        dataType: "string",
                        required: false,
                        desc: "The IP of the RDP, for example “73.69.8.10”. This IP can be change whenever the data from request changes."
                    },
                    {
                        title: "cpuPercentage",
                        dataType: "number",
                        required: true,
                        desc: "The CPU usage of the RDP, for example 30. This CPU can be change whenever the data from request changes."
                    },
                    {
                        title: "ramPercentage",
                        dataType: "number",
                        required: true,
                        desc: "The RAM usage of the RDP, for example 60. This RAM can be change whenever the data from request changes."
                    },
                    {
                        title: "bot",
                        dataType: "BotObject",
                        required: true,
                        desc: "The BotObject is form of the bot.",
                        children: [
                            {
                                title: "name",
                                dataType: "string",
                                required: true,
                                desc: "The name is represent of Bot name."
                            },
                            {
                                title: "lvl",
                                dataType: "number",
                                required: true,
                                desc: "The lvl is represent of Bot level."
                            },
                            {
                                title: "world",
                                dataType: "string",
                                required: true,
                                desc: "The world is represent of Bot location."
                            },
                            {
                                title: "status",
                                dataType: "string",
                                required: true,
                                desc: "The status is represent of Bot status, and consist of 'CONNECTED', 'DISCONNECTED', 'SUSPENED'."
                            },
                            {
                                title: "gems",
                                dataType: "number",
                                required: true,
                                desc: "The gems is represent the gems the Bot has."
                            },
                            {
                                title: "activity",
                                dataType: "string",
                                required: false,
                                desc: "The activity is represent of Bot current activity, and consist of 'FOUND_NUKED_WORLD', 'MOD_ENTERED', 'LOGON_FAIL'."
                            },
                        ]
                    },
                ],
                sample: [
                    {
                        platform: "cURL",
                        code: "`curl --location https://api.gaportal.yatma.me/private/v1/data' \\ \n--header 'x-api-key: JjmVhf7.....IEDbdXYeU=' \\ \n--header 'Content-Type: application/json' \\ \n--data '{\n\t\"groupName\" : \"RDP AWS\", \n\t\"ip\t\": \"73.69.8.10\",\n\t\"cpuPercentage\" : 30, \n\t\"ramPercentage\" : 60, \n\t\"bot\": { \n\t\t\"name\": \"BotConnectedTest\", \n\t\t\"lvl\": 55, \n\t\t\"world\": \"KAMPUNGJAGO\", \n\t\t\"status\": \"CONNECTED\", \n\t\t\"gems\": 20000 , \n\t\t\"activity\": \"FOUND_NUKED_WORLD\" \n\t}\n}'`"
                    }
                ]
            }
        }
    ]
) as Docs[];