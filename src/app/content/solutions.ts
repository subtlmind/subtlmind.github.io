import { TARGETS } from './site';

export interface SolutionStat {
  value: string;
  label: string;
}

export interface Solution {
  /** URL slug: /solutions/<slug> */
  slug: string;
  /** Legacy in-page anchor on /solutions (kept so old #links still work). */
  anchor: string;
  pillar: string;
  eyebrow: string;
  title: string;
  /** One sentence for cards, footers and meta descriptions. */
  summary: string;
  desc: string;
  bullets: string[];
  stats: SolutionStat[];
  useCases: { title: string; desc: string }[];
  integrations: string[];
  image: string;
  imageAlt: string;
  blueprintLabel: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'iot-sensor-networks',
    anchor: 'iot',
    pillar: '01',
    eyebrow: 'Sensors & edge gateways',
    title: 'IoT Sensor Networks & Edge Gateways',
    summary:
      'Sensor networks and edge gateways that collect equipment and building data reliably, even when the internet drops.',
    desc:
      'We design, install and connect the sensors and edge gateways that monitor your equipment and spaces around the clock. Data is cleaned and processed on site, so you get reliable readings in milliseconds and nothing is lost when the network goes down.',
    bullets: [
      'Connects to the protocols you already run: MQTT, Modbus, BACnet, BLE Mesh, Zigbee and Matter',
      `On-site processing designed for ${TARGETS.edgeLatency.value} latency, with filtering and data clean-up at the gateway`,
      'Local buffering keeps every reading during internet outages and uploads it when the connection returns',
      'Encrypted end to end (mTLS), with personal data stripped out before anything leaves the site'
    ],
    stats: [
      TARGETS.edgeLatency,
      { value: 'Store & forward', label: 'No data loss offline' },
      { value: '10 kHz', label: 'Vibration & acoustic sampling' }
    ],
    useCases: [
      {
        title: 'Equipment condition monitoring',
        desc: 'Vibration, temperature and power sensors on motors, pumps, compressors and chillers.'
      },
      {
        title: 'Building environment',
        desc: 'Temperature, humidity, CO₂ and occupancy across floors, rooms and zones.'
      },
      {
        title: 'Cold chain & storage',
        desc: 'Continuous temperature logging with alerts before stock goes out of range.'
      }
    ],
    integrations: ['MQTT', 'Modbus', 'BACnet', 'OPC UA', 'BLE Mesh', 'Zigbee', 'Matter'],
    image: '/assets/solutions/iot-sensory-architecture.svg',
    imageAlt: 'Architecture diagram: sensors feed edge gateways, which stream cleaned data to the cloud',
    blueprintLabel: 'Sensors & edge',
    seoTitle: 'IoT Sensor Networks & Edge Gateways | Subtlmind',
    seoDescription:
      'Industrial and building IoT: sensor networks, edge gateways and reliable telemetry pipelines with on-site processing and no data loss during outages.',
    keywords:
      'industrial IoT, IoT sensor network, edge gateway, MQTT, Modbus, BACnet, condition monitoring, Hyderabad IoT company'
  },
  {
    slug: 'computer-vision',
    anchor: 'vision',
    pillar: '02',
    eyebrow: 'Video analytics',
    title: 'Computer Vision & Video Analytics',
    summary:
      'Vision AI on your existing IP, machine-vision and thermal cameras: safety, quality inspection and hotspot detection.',
    desc:
      'We run vision models directly on edge hardware next to your cameras, so video never has to leave the site. The same setup handles safety monitoring, quality inspection and thermal hotspot detection on IP, machine-vision and thermal cameras you may already own.',
    bullets: [
      'Works with standard RTSP/ONVIF IP cameras, GigE/USB3 machine-vision cameras and radiometric thermal cameras',
      'Object detection for people, vehicles, machinery and restricted-zone entry (YOLO and RT-DETR models)',
      'Segmentation that outlines thermal hotspots, leaks and surface defects pixel by pixel',
      'Classification for PPE compliance, machine operating state and automated quality grading',
      `Designed for ${TARGETS.visionLatency.value} per frame at ${TARGETS.visionFps.value} on NVIDIA Jetson Orin, with faces blurred on the device`
    ],
    stats: [
      { value: TARGETS.visionLatency.value, label: 'Inference per frame' },
      { value: TARGETS.visionFps.value, label: 'Per camera' },
      { value: TARGETS.precision.value, label: 'Detection precision' }
    ],
    useCases: [
      {
        title: 'PPE & safety compliance',
        desc: 'Detect missing hard hats or vests and people entering restricted zones.'
      },
      {
        title: 'Quality inspection',
        desc: 'Spot surface defects and grade parts on the line with machine-vision cameras.'
      },
      {
        title: 'Thermal hotspot detection',
        desc: 'Flag overheating motors, panels and conveyors before they fail.'
      }
    ],
    integrations: ['RTSP / ONVIF', 'GigE Vision', 'USB3 Vision', 'Radiometric thermal', 'NVIDIA Jetson', 'TensorRT'],
    image: '/assets/solutions/video-inference-architecture.svg',
    imageAlt: 'Architecture diagram: camera feeds processed by on-site vision models that send alerts',
    blueprintLabel: 'Video analytics',
    seoTitle: 'Computer Vision & Video Analytics on Edge Hardware | Subtlmind',
    seoDescription:
      'Edge computer vision for factories and buildings: PPE detection, quality inspection and thermal hotspot detection on your IP, machine-vision and thermal cameras.',
    keywords:
      'computer vision, video analytics, PPE detection, machine vision inspection, thermal camera AI, edge AI, NVIDIA Jetson, RT-DETR, YOLO'
  },
  {
    slug: 'predictive-maintenance',
    anchor: 'predictive',
    pillar: '03',
    eyebrow: 'Predictive maintenance',
    title: 'Predictive Maintenance',
    summary:
      'Deep learning models that spot bearing, valve and motor wear days or weeks before a breakdown.',
    desc:
      'Our models learn the normal vibration, temperature, sound and power signature of each machine and warn you when it starts to drift. You get time to plan repairs during scheduled downtime instead of reacting to breakdowns.',
    bullets: [
      'Combines vibration, thermal, acoustic and power data, so a single noisy sensor does not trigger false alarms',
      `Forecasts bearing and valve wear with a goal of ${TARGETS.leadTime.value.toLowerCase()} of warning`,
      'Lightweight models that run on edge accelerators and alongside industrial PLCs',
      'Baselines recalibrate automatically as seasons, loads and duty cycles change'
    ],
    stats: [
      { value: TARGETS.precision.value, label: 'Detection precision' },
      { value: TARGETS.downtime.value, label: TARGETS.downtime.label },
      { value: TARGETS.leadTime.value, label: 'Early warning' }
    ],
    useCases: [
      {
        title: 'Rotating equipment',
        desc: 'Motors, pumps, fans and compressors: catch bearing wear, misalignment and imbalance.'
      },
      {
        title: 'HVAC & chillers',
        desc: 'Detect refrigerant, valve and compressor problems before comfort or cold storage is affected.'
      },
      {
        title: 'Production lines',
        desc: 'Track conveyor, gearbox and spindle health and schedule fixes into planned stops.'
      }
    ],
    integrations: ['Vibration & accelerometers', 'Thermal sensors', 'Power meters', 'PLC / SCADA', 'CMMS work orders'],
    image: '/assets/solutions/predictive-maintenance-dl.svg',
    imageAlt: 'Architecture diagram: machine sensor data feeds forecasting models that raise maintenance alerts',
    blueprintLabel: 'Predictive maintenance',
    seoTitle: 'Predictive Maintenance with Deep Learning | Subtlmind',
    seoDescription:
      'Predictive maintenance for motors, pumps, compressors and chillers: deep learning on vibration, thermal and power data to warn of failures early.',
    keywords:
      'predictive maintenance, condition monitoring, vibration analysis, anomaly detection, chiller maintenance, deep learning, industrial AI India'
  },
  {
    slug: 'conversational-ai',
    anchor: 'conversational',
    pillar: '04',
    eyebrow: 'Operations assistant',
    title: 'AI Operations Assistant',
    summary:
      'Ask your equipment and building data questions in plain English and get answers grounded in your manuals.',
    desc:
      'Instead of digging through dashboards, operators and engineers type or say a question and get a direct answer. The assistant reads your live sensor data alongside your equipment manuals and site procedures, and it can run fully on-premise.',
    bullets: [
      'Answers are grounded in your OEM manuals, SOPs and facility policies (retrieval-augmented generation)',
      'Ask things like "why did chiller 2 use more energy last night?" and get a plain-English explanation',
      'Drafts work orders, checks spare-parts inventory and suggests maintenance slots',
      'Can run on your own servers or edge hardware, so operational data stays inside your network'
    ],
    stats: [
      { value: TARGETS.queryLatency.value, label: 'Answer time target' },
      { value: 'On-prem', label: 'Deployment option' },
      { value: 'Your docs', label: 'Grounded answers' }
    ],
    useCases: [
      {
        title: 'Technician troubleshooting',
        desc: 'Step-by-step repair guidance pulled from the exact manual for that machine.'
      },
      {
        title: 'Shift handover summaries',
        desc: 'An automatic summary of overnight alarms, anomalies and open work orders.'
      },
      {
        title: 'Facility manager Q&A',
        desc: 'Ask about energy use, comfort complaints or equipment status without training on a BMS.'
      }
    ],
    integrations: ['On-prem LLMs', 'Vector search', 'CMMS / ERP', 'Microsoft Teams & Slack', 'Webhooks'],
    image: '/assets/solutions/conversational-rag-pipeline.svg',
    imageAlt: 'Architecture diagram: questions answered by a language model grounded in live data and manuals',
    blueprintLabel: 'Operations assistant',
    seoTitle: 'AI Operations Assistant for Plants & Buildings | Subtlmind',
    seoDescription:
      'A plain-English AI assistant for operations teams, grounded in live sensor data and your equipment manuals. On-premise deployment available.',
    keywords:
      'AI assistant for maintenance, LLM for operations, RAG, on-premise LLM, industrial copilot, facility management AI'
  },
  {
    slug: 'building-automation',
    anchor: 'automation',
    pillar: '05',
    eyebrow: 'Building automation',
    title: 'Smart Building & Energy Automation',
    summary:
      'Automatic control of HVAC, lighting and equipment loads based on real occupancy, to cut energy without hurting comfort.',
    desc:
      'We connect sensing to action. The system adjusts HVAC, lighting, ventilation and equipment loads in real time based on how spaces are actually being used, and integrates with the building management system you already have.',
    bullets: [
      'Integrates with existing building management systems over BACnet, Modbus and cloud APIs',
      'Privacy-friendly occupancy sensing with mmWave radar and light sensors, without cameras',
      `Targets ${TARGETS.commercialEnergy.value.toLowerCase()} lower HVAC & lighting energy in commercial buildings and ${TARGETS.residentialEnergy.value.toLowerCase()} in homes`,
      'Automatic load shedding during peak-tariff hours without affecting occupant comfort'
    ],
    stats: [
      { value: TARGETS.commercialEnergy.value, label: TARGETS.commercialEnergy.label },
      { value: 'Sub-second', label: 'BMS control response' },
      { value: 'No cameras', label: 'Occupancy sensing' }
    ],
    useCases: [
      {
        title: 'Offices & campuses',
        desc: 'Demand-based ventilation and cooling that follows real room usage.'
      },
      {
        title: 'Hotels & hospitality',
        desc: 'Rooms that set back automatically when empty and recover before guests return.'
      },
      {
        title: 'Premium residential',
        desc: 'Lighting, climate and appliance scheduling that adapts to the household.'
      }
    ],
    integrations: ['BACnet', 'Modbus', 'KNX', 'mmWave radar', 'Smart meters', 'Cloud BMS APIs'],
    image: '/assets/solutions/smart-operations-loop.svg',
    imageAlt: 'Architecture diagram: occupancy and energy data drive automatic HVAC and lighting control',
    blueprintLabel: 'Building automation',
    seoTitle: 'Smart Building & Energy Automation | Subtlmind',
    seoDescription:
      'Occupancy-driven HVAC, lighting and load control that integrates with your BMS to cut energy use without hurting comfort.',
    keywords:
      'building automation, smart building, HVAC optimisation, energy management, BACnet integration, occupancy sensing, demand response'
  }
];

export function findSolution(slug: string | null | undefined): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
