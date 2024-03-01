varying vec2 vUv;

uniform float uTime;
uniform vec2 uPointer;
uniform sampler2D uTexture;
uniform vec2 uOutputResolution;
uniform vec2 uTextureResolution;

vec2 getRatio(vec2 uv,float texture_ratio,float output_ratio)
{
    // Scale the texture to fit the output
    if(texture_ratio>output_ratio)
    {
        float diff=output_ratio/texture_ratio;
        uv.x*=diff;
        uv.x+=(1.-diff)/2.;
    }
    else
    {
        float diff=texture_ratio/output_ratio;
        uv.y*=diff;
        uv.y+=(1.-diff)/2.;
    }
    return uv;
}

void main(void)
{
    
    // Get aspect ratios
    float texture_ratio=uTextureResolution.x/uTextureResolution.y;
    float output_ratio=uOutputResolution.x/uOutputResolution.y;
    vec2 coords=getRatio(vUv,texture_ratio,output_ratio);
    
    // Safe area
    coords=mix(vec2(.1),vec2(.9),coords);
    
    float blocks=12.;
    float x=floor(vUv.x*blocks);
    float y=floor(vUv.y*blocks);
    
    // Normalize the mouse coordinates
    vec2 pointer=(uPointer+1.)/2.;
    
    float dist=distance(vUv,pointer);
    float strength=smoothstep(.35,0.,dist);
    
    vec2 distortion=vec2(sin(uTime*.5+x*1.5+y*.75)*strength,cos(uTime*.25+x*2.+y)*strength)*.075;
    
    vec4 color=texture2D(uTexture,coords+distortion);
    vec4 outputColor=vec4(color);
    gl_FragColor=outputColor;
}