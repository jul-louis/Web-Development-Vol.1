<?xml version="1.0" encoding="utf-8" ?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:x="http://localhost" exclude-result-prefixes="x">
    <xsl:template match="/">
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <style>
                    body {
                        color: #1F1A1F;
                        background:#382F38; 
                        position: relative;
                        font-size: 1.4rem;
                        margin-block-start: 0;
                        margin-block-end: 0;
                        display: flex;
                        justify-content: center;
                    }
                    h1 {
                        font-size: 3rem;
                        margin-block-start: 0;
                        margin-block-end: 0;
                    }
                    h2 {
                        font-size: 2rem;
                        margin-block-start: 0;
                        margin-block-end: 0;
                    }
                    h3 {
                        margin-block-start: 1rem;
                        margin-block-end: 0;
                    }
                    h4 {
                        font-weight: normal;
                        margin-block-start: 0;
                        margin-block-end: 0;
                    }
                    p {
                        margin:10px 0 10px 0;
                    }
                    hr {
                        border-width:1px 0 1px 0;
                        border-style: solid;
                        margin: 12px 0 12px 0;
                    }
                    span {
                        float: right;
                    }
                    div {
                        clear: both;
                    }
                    .label {
                        color: #FFF0F1; 
                        position:absolute; 
                        z-index:-1;
                        font-size:5rem; 
                        top:0px; 
                        left: 40px; 
                    }
                    .content {
                        background: #FFF0F1;
                        padding: 40px; 
                        overflow: scroll;
                        height: 76vh;
                        width: 90vw;
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: nowrap;
                        flex-direction: column;
                        margin: auto;
                    }
                    .bullet {
                        display: list-item;
                        list-style-type: disc;
                        list-style-position: inside; 
                    }
                    .italic {
                        font-style: italic;
                    }
                </style>
            </head>
            <body>
                <div class="label">Résumé</div>
                <div class="content">
                <header>
                    <h1>
                        <xsl:value-of select="/x:resume/x:information/x:name"/>
                    </h1>
                </header>
                <hr/>
                <section class="italic">
                    <xsl:for-each select="/x:resume/x:information/x:address">
                        <xsl:value-of select="x:street"/>, 
                        <xsl:value-of select="x:city"/>,
                        <xsl:value-of select="x:province"/>&#10240;<xsl:value-of select="x:postal"/>,
                        <xsl:value-of select="x:country"/><br/>
                    </xsl:for-each>
                    <xsl:for-each select="/x:resume/x:information/x:contact"> 
                    email: <xsl:value-of select="x:email"/><br/>
                    mobile: <xsl:value-of select="x:mobile"/>
                    </xsl:for-each>                    
                </section>
                <hr/>

                <section>
                    <h2>Education Background</h2>
                    <xsl:for-each select="/x:resume/x:education/x:university">
                        <h3>
                            <xsl:value-of select="x:institution_name"/> &#8195; 
                            <span>
                                <xsl:value-of select="x:from/x:month"/>&#160;<xsl:value-of select="x:from/x:year"/> -&#160;<xsl:value-of select="x:to/x:month"/>&#160;<xsl:value-of select="x:to/x:year"/>
                            </span>
                        </h3>
                    </xsl:for-each>

                    <xsl:for-each select="/x:resume/x:education/x:university/x:degree">
                        <div class="italic">
                            Department of <xsl:value-of select="x:department"/>,
                            Faculty of <xsl:value-of select="x:faculty"/>
                        </div>
                        <div>
                            <p>
                                <xsl:value-of select="x:degree_type"/> in
                                <xsl:value-of select="x:major"/>
                            </p>
                        </div>
                    </xsl:for-each>  
                    <xsl:for-each select="/x:resume/x:education/x:university/x:engineering_graduation_average">     
                    <div>
                        <p>
                            EGA: <xsl:value-of select="x:grade_point_average"/> / <xsl:value-of select="x:max_possible_value"/> (Current, <xsl:value-of select="x:status"/>)
                        </p>
                    </div>
                    </xsl:for-each>            
                </section>
                <hr/>  
                <section>
                    <h2>Work Experience</h2>
                    <xsl:for-each select="/x:resume/x:work_experience">
                        <h3><xsl:value-of select="x:company/x:name"/> &#8195; 
                            <span>
                                <xsl:value-of select="x:from/x:month"/>&#160;<xsl:value-of select="x:from/x:year"/> -&#160;<xsl:value-of select="x:to/x:month"/>&#160;<xsl:value-of select="x:to/x:year"/>
                            </span>
                        </h3>
                            <div class="italic">
                                <xsl:value-of select="x:position"/>  &#8195;
                                <span>
                                    <xsl:value-of select="x:company/x:address/x:city"/>,
                                    <xsl:value-of select="x:company/x:address/x:province"/>,
                                    <xsl:value-of select="x:company/x:address/x:country"/> 
                                </span>
                            </div>
                        <div class="italic">
                            <p><xsl:value-of select="x:experience/x:award"/></p>
                            <p><xsl:value-of select="x:experience/x:improvement"/></p>                
                        </div>
                    </xsl:for-each> 
                    <xsl:for-each select="/x:resume/x:work_experience/x:role_description">
                        <div>
                            <p class="bullet"><xsl:value-of select="x:role"/></p>
                        </div>
                    </xsl:for-each>      
                </section>
                <hr/>  
                <footer>
                    <h4 class="italic">References available upon requests</h4>
                </footer>
            </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>

