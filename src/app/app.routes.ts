import { Routes } from '@angular/router';
import { PlatformComponent } from './pages/platform/platform';
import { SolutionsComponent } from './pages/solutions/solutions';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
    title: 'Subtlmind | Ambient Intelligence for Intuitive Modern Living',
    data: {
      description: 'Subtlmind transforms continuous physical sensory streams, real-time video inference, and predictive machine intelligence into effortless modern living and self-optimizing operations.',
      keywords: 'ambient intelligence, edge AI, IoT architecture, real-time sensory telemetry, predictive maintenance, smart living, computer vision, Subtlmind',
      path: '/'
    }
  },
  {
    path: 'platform',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'solutions',
    component: SolutionsComponent,
    title: 'Solutions & Capabilities | Real-Time Video Inference, IoT & Predictive AI | Subtlmind',
    data: {
      description: 'Deploy real-time video inference on IP, machine vision, and thermal cameras. Subtlmind provides deep learning object detection, predictive maintenance, and conversational control.',
      keywords: 'video inference, computer vision, RT-DETR, thermal cameras, IP cameras, machine vision, IoT architecture, predictive maintenance, conversational RAG, edge AI, Subtlmind',
      path: '/solutions'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Subtlmind | Vision, Principles & Engineering Leadership',
    data: {
      description: 'Learn about Subtlmind Technologies, our founding philosophy of unobtrusive ambient intelligence, zero-trust edge security, and our multidisciplinary engineering team.',
      keywords: 'about Subtlmind, ambient AI vision, edge architecture principles, engineering leadership, Hyderabad AI company, privacy-first IoT',
      path: '/about'
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Engineering & Solutions Desk | Subtlmind',
    data: {
      description: 'Connect directly with Subtlmind architects and engineers for sensory IoT deployments, computer vision pipelines, or bespoke predictive maintenance architectures.',
      keywords: 'contact Subtlmind, schedule architecture consultation, Hyderabad IoT center, edge AI inquiry, subtlmind@outlook.com',
      path: '/contact'
    }
  },
  { path: '**', redirectTo: '' }
];
