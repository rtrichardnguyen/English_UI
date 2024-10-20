from flask import Flask, request, jsonify
import heapq

app = Flask(__name__)

# Global heap to store the incidents
min_heap = []

# Route to add data to the heap
@app.route('/add', methods=['POST'])
def add_to_heap():
    data = request.get_json()  # Get the JSON data sent from the TypeScript app
    
    # Extract fields from the incoming JSON data
    incident_type = data['incident_type']
    severity = data['severity']  # This will be used for the heap ordering
    location = tuple(data['location'])
    time = data['time']
    description = data['description']
    suggestion = data['suggestion']

    # Add the incident to the heap (ordering based on severity)
    heapq.heappush(min_heap, (severity, {
        'incident_type': incident_type,
        'location': location,
        'time': time,
        'description': description,
        'suggestion': suggestion
    }))
    
    return jsonify({"message": "Incident added successfully", "heap": min_heap})

# Route to retrieve the current state of the heap
@app.route('/heap', methods=['GET'])
def get_heap():
    return jsonify({"heap": min_heap})

if __name__ == '__main__':
    app.run(debug=True)
