// app/api/webhook/route.ts
import { NextResponse } from 'next/server';

// In-memory store to temporarily hold incidents
let incidents: any[] = [];

export async function GET() {
  // Return all stored incidents
  return NextResponse.json(incidents);
}

export async function POST(request: Request) {
  console.log('POST request received'); // Log to confirm the request is received

  try {
    // Parse the incoming request's JSON data
    const data = await request.json();

    // Log the entire received data
    console.log('Received data from Zapier:', JSON.stringify(data, null, 2));

    // Safely extract relevant fields from the data using optional chaining
    const callerInfo = data?.caller_info || {};
    const incidentDetails = data?.incident_details || {};
    const additionalInfo = data?.additional_info || {};
    const responseRequirements = data?.response_requirements || {};
    const suggestionsForDeployment = data?.suggestions_for_deployment || {};

    const newIncident = {
      caller_info: {
        name: callerInfo.name || "Unknown",
        location: callerInfo.location || "Unknown",
      },
      incident_details: {
        incident_type: incidentDetails.incident_type || "Unknown",
        incident_location: incidentDetails.incident_location || {},
        time: incidentDetails.time || "Unknown",
        nature_of_emergency: incidentDetails.nature_of_emergency || "Unknown",
        severity: incidentDetails.severity || "Unknown",
        priority_level: incidentDetails.priority_level || 1,
        number_of_people_involved: incidentDetails.number_of_people_involved || 0,
        injuries_or_symptoms: incidentDetails.injuries_or_symptoms || "None",
        description_of_events: incidentDetails.description_of_events || "No description provided",
        special_circumstances: incidentDetails.special_circumstances || "None",
      },
      additional_info: {
        caller_positioning: additionalInfo.caller_positioning || "Unknown",
        suspect_or_vehicle_description: additionalInfo.suspect_or_vehicle_description || "None",
        bystanders_present: additionalInfo.bystanders_present || "Unknown",
        background_noise_or_indications: additionalInfo.background_noise_or_indications || "None",
        language_or_accessibility_needs: additionalInfo.language_or_accessibility_needs || "None",
        history_or_repeat_calls: additionalInfo.history_or_repeat_calls || "Unknown",
      },
      response_requirements: {
        required_resources: responseRequirements.required_resources || "None specified",
        urgency: responseRequirements.urgency || "Unknown",
      },
      suggestions_for_deployment: {
        who_to_deploy: suggestionsForDeployment.who_to_deploy || "Unknown",
        how_to_help: suggestionsForDeployment.how_to_help || "Unknown",
      }
    };

    // Log the new incident data
    console.log('New Incident Created:', newIncident);

    // Add the new incident to the in-memory store
    incidents.push(newIncident);

    // Respond with a success message and all incidents, including the full data
    return NextResponse.json({ message: 'Data received successfully!', incidents });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
  }
}