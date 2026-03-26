from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing tasks.

    list:   GET  /api/tasks/
    create: POST /api/tasks/
    retrieve: GET  /api/tasks/{id}/
    update: PUT  /api/tasks/{id}/
    partial_update: PATCH /api/tasks/{id}/
    destroy: DELETE /api/tasks/{id}/
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'due_date', 'priority', 'status']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Task.objects.all()
        status = self.request.query_params.get('status')
        priority = self.request.query_params.get('priority')
        if status:
            queryset = queryset.filter(status=status)
        if priority:
            queryset = queryset.filter(priority=priority)
        return queryset

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Return task statistics."""
        total = Task.objects.count()
        by_status = {
            'todo': Task.objects.filter(status='todo').count(),
            'in_progress': Task.objects.filter(status='in_progress').count(),
            'done': Task.objects.filter(status='done').count(),
        }
        by_priority = {
            'low': Task.objects.filter(priority='low').count(),
            'medium': Task.objects.filter(priority='medium').count(),
            'high': Task.objects.filter(priority='high').count(),
        }
        return Response({'total': total, 'by_status': by_status, 'by_priority': by_priority})
